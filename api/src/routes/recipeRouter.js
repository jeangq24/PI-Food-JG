const { Router } = require("express");
const { Recipe, Type_diet } = require("../db.js");
const { Op } = require("sequelize");
const { KEY_API, KEY_API2,KEY_API3,KEY_API4,KEY_API5 } = process.env;
const axios = require("axios");
const router = Router();

//OBTENGO TODAS LAS RECETAS DE DB Y API O QUE COINCIDAN CON LO QUE ME ENVIAN POR QUERY
router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      let respuestaApiList = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?number=90&apiKey=${KEY_API5}&addRecipeInformation=${true}`
        );
      let filtradoApi = [];
      respuestaApiList.data.results.forEach((elemento) => {
        filtradoApi.push({
          id: elemento.id,
          title: elemento.title,
          puntuacion: elemento.spoonacularScore,     
          image: elemento.image,
          diets: elemento.diets,
        });
      });
      const respuestaDB = await Recipe.findAll({
        include: Type_diet,
        attributes: ["id", "title", "puntuacion", "image",],
      });

      let filtradoDiet = [];
      let filtradoDB = [];
      let filtradoFinalDB = [];
      respuestaDB.forEach((elemento, indice) => {
        filtradoDB.push({
          id: elemento.id,
          title: elemento.title,
          puntuacion: elemento.puntuacion,
          image: elemento.image,
        });

        elemento.type_diets.forEach((elementoDos) => {
          filtradoDiet.push(elementoDos.nombre_dieta.toLowerCase());
        });

        filtradoFinalDB.push({ ...filtradoDB[indice], diets: filtradoDiet });
        filtradoDiet=[]
      });

      res.json([...filtradoFinalDB,...filtradoApi])
    } else {
      //VALIDO QUE UNA KEY QUERY NO TENGA MULTIPLES VALUES
      if (Array.isArray(name)) {
        return res.send(`No es posible, Revisa que la Query no tenga 
        multiples valores para una misma Query (recipe?name=valor1&name=valor2X)`);
      }

      //BUSCO EN API LAS RECETAS QUE COINCIDAN CON LO QUE ME PASAN POR QUERY
       let respuestaApi = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=90&apiKey=${KEY_API4}&addRecipeInformation=${true}`
       );

      //HAGO UN FILTRADO DE LA DATA DE LA API PARA OBTENER SOLO LOS CAmPOS QUE NECESITO
      let filtradoApi = [];
      respuestaApi.data.results.forEach((elemento) => {
        filtradoApi.push({
          id: elemento.id,
          title: elemento.title,
          puntuacion: elemento.spoonacularScore,
          image: elemento.image,
          diets: elemento.diets,
        });
      });
      filtradoApi= filtradoApi.sort((a, b) => {
        if (a.title > b.title) {
          return 1;
        }
        if (a.title < b.title) {
          return -1;
        }
        return 0;
      })
      //BUSCO EN DB LAS RECETAS QUE COINCIDAN CON LO QUE ME PASAN POR QUERY
      const respuestaDB = await Recipe.findAll({
        include: Type_diet,
        attributes: ["id", "title", "puntuacion", "image"],
        where: {
          title: { [Op.iLike]: name+"%" },
        },
      });

      //HAGO UN FILTRADO A LA RESPUESTA DEL MODELO RECIPE PARA OBTENER LOS CAPOS REQUERIDOS
      let filtradoDiet = [];
      let filtradoDB = [];
      let filtradoFinalDB = [];
      respuestaDB.forEach((elemento, indice) => {
        filtradoDB.push({
          id: elemento.id,
          title: elemento.title,
          puntuacion: elemento.puntuacion,
          image: elemento.image,
        });

        //HAGO UNA SEGUNDA ITERACION PARA PODER FILTRAR LA
        //INFORMACION QUE NECESITO DE LA INFORMACION INCLUIDA DE EL MODELO TYPE DIETS
        elemento.type_diets.forEach((elementoDos) => {
          filtradoDiet.push(elementoDos.nombre_dieta.toLowerCase());
          
        });
        //FINALMENTE JUNTO EL FILTRADO DE EL MODELO RECIPE Y EL FILTRADO DE LA INFORMACION INCLUIDA DE
        //MI MODELO TYPE DIETS PARA ARMAR UNA RESPUESTA GENEMELA AL DE LA API
        filtradoFinalDB.push({ ...filtradoDB[indice], diets: filtradoDiet });
        filtradoDiet=[]
      });

      //UNIFICO RESPUESTAS GEMELAS DE API Y DB PARA TENER UN RESULTADO FINAL DE RESPUESTA<
      let respuestaFinal = [...filtradoFinalDB,...filtradoApi];

      //RESPONDO DE ACUERDO A LO QUE TENGO EN MI ARREGLO FINAL
      return !respuestaFinal[0]
        ? res.send("No se encontro receta/s para mostrar.")
        : res.json(respuestaFinal);
    }
  } catch (error) {
    //EN CASO DE QUE FALLE LA PETICION A LA API O DB SE RESPONDE CON EL ERROR
    return res.send("ERROR: " + error);
  }
});

//OBTENGO LAS RECETAS DE DB O API DE FORMA DETALLADA, POR PARAMS(ID) QUE ME PASEN
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    //VALIDO SI EL ID CORRESPONDE A LA API O A LA DB
    if (id.indexOf("-") > 0) {
      //CREO UNA INSTANCIA DEL MODELO Y ADEMAS BUSCO LA RECETA CORRESPONDIENTE AL ID E INCLUYO LOS TIPOS DE DIETAS
      const respuestaDB = await Recipe.findAll({
        include: Type_diet,
        where: {
          id,
        },
      });
      let filtradoDiet = [];
      let filtradoDB = [];
      let filtradoFinalDB = [];
      respuestaDB.forEach((elemento, indice) => {
        filtradoDB.push({
          title: elemento.title,
          image: elemento.image,
          puntuacion: elemento.puntuacion,
          nivel_saludable: elemento.nivel_saludable,
          paso_paso: elemento.paso_paso,
          tipo_plato: elemento.tipo_plato,
        });

        //HAGO UNA SEGUNDA ITERACION PARA PODER FILTRAR LA
        //INFORMACION QUE NECESITO DE LA INFORMACION INCLUIDA DE EL MODELO TYPE DIETS
        elemento.type_diets.forEach((elementoDos) => {
          filtradoDiet.push(elementoDos.nombre_dieta);
          console.log(filtradoDiet);
        });

        //FINALMENTE JUNTO EL FILTRADO DE EL MODELO RECIPE Y EL FILTRADO DE LA INFORMACION INCLUIDA DE
        //MI MODELO TYPE DIETS PARA ARMAR UNA RESPUESTA GENEMELA AL DE LA API
        filtradoFinalDB.push({ ...filtradoDB[indice], diets: filtradoDiet });
      });
      //RESPONDO DEACUERDO A LO QUE OBTUVE EN MI CONSULTA
      return res.json(filtradoFinalDB);
    } else {
      //REALIZO LA BUSQUEDA DE LA RECETA QUE CORRESPONDE AL ID
      let respuestaApiData = [];
      let respuestaApi = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${KEY_API}`
      );
      respuestaApiData.push(respuestaApi.data);
      let filtradoApi = [];
      respuestaApiData.forEach((elemento) => {
        filtradoApi.push({
          title: elemento.title,
          image: elemento.image,
          puntuacion: elemento.spoonacularScore,
          nivel_saludable: elemento.healthScore,
          paso_paso: elemento.instructions,
          tipos_platos: elemento.dishTypes,
          tipo_dieta: elemento.diets,
        });
      });

      return res.json(filtradoApi);
    }
  } catch (error) {
    return res.send(error);
  }
});

//AGREGO RECETAS A LA DATA BASE
router.post("/", async (req, res) => {
  const {
    title,
    puntuacion,
    nivel_saludable,
    tipo_dieta,
    paso_paso,
    image,
    tipo_plato,
  } = req.body;
  try {
    //CREO UNA INSTANCIA DE MI MODELO Y ADEMAS CREO REGISTROS A EL MISMO
    const newRecipe = await Recipe.create({
      title,
      puntuacion,
      nivel_saludable,
      paso_paso,
      image,
      tipo_plato,
    });

    //AGREGO A UNA RECETA DIFERENTES TIPOS DE DIETAS EXISTENTE
    tipo_dieta.forEach(async (elemento) => {
      await newRecipe.addType_diet(elemento);
    });

    //RESPONDO CON LA INSTANCIA DE LA RECETA QUE FUE AGREGADA A LA BASE DE DATOS
    return res.json(newRecipe);
  } catch (error) {
    return res.send(error);
  }
});

module.exports = router;
