const express = require("express");
const { Type_diet } = require("../db.js");
const router = express.Router();
/*const listDiet = [
  {
    nombre_dieta: "Gluten Free",
    description:
      "Eliminating gluten means avoiding wheat, barley, rye, and other gluten-containing grains and foods made from them (or that may have been cross contaminated).",
  },
  {
    nombre_dieta: "Ketogenic",
    description:
      "The keto diet is based more on the ratio of fat, protein, and carbs in the diet rather than specific ingredients. Generally speaking, high fat, protein-rich foods are acceptable and high carbohydrate foods are not.",
  },
  {
    nombre_dieta: "Vegetarian",
    description:
      "No ingredients may contain meat or meat by-products, such as bones or gelatin.",
  },
  {
    nombre_dieta: "Lacto-Vegetarian",
    description:
      "All ingredients must be vegetarian and none of the ingredients can be or contain egg.",
  },
  {
    nombre_dieta: "Ovo-Vegetarian",
    description:
      "All ingredients must be vegetarian and none of the ingredients can be or contain dairy.",
  },
  {
    nombre_dieta: "Vegan",
    description:
      "No ingredients may contain meat or meat by-products, such as bones or gelatin, nor may they contain eggs, dairy, or honey.",
  },
  {
    nombre_dieta: "Pescetarian",
    description:
      "Everything is allowed except meat and meat by-products - some pescetarians eat eggs and dairy, some do not.",
  },
  {
    nombre_dieta: "Paleo",
    description:
      "Allowed ingredients include meat (especially grass fed), fish, eggs, vegetables, some oils (e.g. coconut and olive oil), and in smaller quantities, fruit, nuts, and sweet potatoes. We also allow honey and maple syrup (popular in Paleo desserts, but strict Paleo followers may disagree). Ingredients not allowed include legumes (e.g. beans and lentils), grains, dairy, refined sugar, and processed foods.",
  },
  {
    nombre_dieta: "Primal",
    description:
      "Very similar to Paleo, except dairy is allowed - think raw and full fat milk, butter, ghee, etc.",
  },
  {
    nombre_dieta: "Whole30",
    description:
      "Allowed ingredients include meat, fish/seafood, eggs, vegetables, fresh fruit, coconut oil, olive oil, small amounts of dried fruit and nuts/seeds. Ingredients not allowed include added sweeteners (natural and artificial, except small amounts of fruit juice), dairy (except clarified butter or ghee), alcohol, grains, legumes (except green beans, sugar snap peas, and snow peas), and food additives, such as carrageenan, MSG, and sulfites.",
  },
];
*/



//AGREGO TODOS LOS TIPOS DE DIETAS A LA DATA BASE
router.post("/", async (req, res) => {
    let respuesta=[];
    try {

        //RECORRO TODA LA DATA QUE ES ENVIADA POR BODY EN UN ARREGLO Y LA AGREGO A LA DATA BASE
        for (let index = 0; index < req.body.length; index++) {
            const instancia = await Type_diet.create(
                {nombre_dieta: req.body[index].nombre_dieta, description: req.body[index].description}
            )
            console.log(req.body[index].nombre_dieta+" Fue agregado con exito.");

            //AGREGO A UN ARREGLO LA INSTANCIA DE CADA ITERACION
            respuesta.push(instancia);
        }

        //RESPONDO CON EL ARREGLO FINAL OBTENIENDO TODOS LOS DATOS QUE FUERON AGREGADOS
        return res.json(respuesta);
            
    } catch (error) {
        return res.send(error)
    }
});

//OBTENGO TODOS LOS TIPOS DE DIETAS 
router.get('/', async(req, res) => {
    try {
        const listTD= await Type_diet.findAll({
            attributes: ["id_diet","nombre_dieta", "description"],
        });
        return res.json(listTD);   
         
    } catch (error) {
        return res.send(error);
        
    }
});     

module.exports = router;
