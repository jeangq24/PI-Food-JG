import React, { useState } from "react";
import { connect } from "react-redux";
import { postRecipe  } from "../../actions/index.js";
import "./formulario.css";

export  function Formulario({postRecipe}) {

  const [valorTitle, setValorTitle] = useState({ title: "", error: "" });
  const [valorNivelSaludable, setNIvelSaludable] = useState({
    title: "",
    error: "",
  });
  const [valorTipoDieta, setValorTipoDieta] = useState({
    error: "",
    dieta: [],
    nombre: [],
  });

  const [valorTipoPlato, setValorTipoPlato] = useState({
    error: "",
    nombre: []
  })

  const [valorTextArea, serValorTextArea]= useState({text:"", error:""})
  const [errorSubmit, setErrorSubmit]= useState("")
  const [dataCargada, setDataCargada]=useState(false);

  const handleTitle = (event) => {
  
    const { value } = event.target;
    setValorTitle({ title: value, error: "" });

  
    if (!/\w/.test(value)) {
      if (value.length === 0) {
        setValorTitle({ title: value, error: "Campo Obligatorio" });
      } else {
      
          setValorTitle({ title: value, error: "Contiene letras no validas" });
      }
    }
  };

  const handleNivelSaludable = (event) => {
    
    const { value } = event.target;
    setNIvelSaludable({ title: value, error: "" });
    if (parseInt(value) < 0 || parseInt(value) > 100) {
      value < 0
        ? setNIvelSaludable({ title: value, error: "Contiene valor negativo" })
        : setNIvelSaludable({ title: value, error: "Supera el Limite" });
    }

    if (!Number(value)) {
      if (value.length === 0) {
        setNIvelSaludable({ title: value, error: "Campo Obligatorio" });
      } else setNIvelSaludable({ title: value, error: "Requiere un numero" });
    }
    
  };

  const handleTipoDieta = (event) => {
    const { value, innerText } = event.target;

    if(valorTipoDieta.dieta.length===0){
      if(value==="0"){

        setValorTipoDieta({
          
          error: "Opcion no valida",
          dieta: [...valorTipoDieta.dieta],
          nombre: [...valorTipoDieta.nombre],
        });
      }else{
        setValorTipoDieta({
          error: "",
          dieta: [...valorTipoDieta.dieta, Number(value)],
          nombre: [...valorTipoDieta.nombre, innerText],
        });
      }

    }else{
      if(value==="0"){
        setValorTipoDieta({
          
          error: "Opcion no valida",
          dieta: [...valorTipoDieta.dieta],
          nombre: [...valorTipoDieta.nombre],
        });       
      }else{

        valorTipoDieta.dieta.forEach((elemento) => {
       
          if (elemento !== Number(value)) {
     
            setValorTipoDieta({
              error: "",
              dieta: [...valorTipoDieta.dieta, Number(value)],
              nombre: [...valorTipoDieta.nombre, innerText],
            });
          } else {
        
            setValorTipoDieta({
              
              error: "El valor ya fue seleccionado",
              dieta: [...valorTipoDieta.dieta],
              nombre: [...valorTipoDieta.nombre],
            });
          }
        });
      }
      
    }
    
  
  };

  const handleTipoPlato = (event) => {
    const { value } = event.target;
   
    if(valorTipoPlato.nombre.length===0){
      if(value==="0"){
        setValorTipoPlato({  error: "Opcion no valida",
        nombre: [...valorTipoPlato.nombre]})
      }else{
        setValorTipoPlato({
          error: "",
          nombre: [...valorTipoPlato.nombre, value],
        });
      }

    }else{
      if(value==="0"){
        setValorTipoPlato({  error: "Opcion no valida",
        nombre: [...valorTipoPlato.nombre]})
      }else{
        valorTipoPlato.nombre.forEach((elemento) => {
   
          if (elemento !== value) {
   
            setValorTipoPlato({
              error: "",
              nombre: [...valorTipoPlato.nombre,value],
              
            });
          } else {
        
            setValorTipoPlato({
              
              error: "El valor ya fue seleccionado",
              nombre: [...valorTipoPlato.nombre],
            });
          }
        });
      }
      
    }
    

  };


  const handleEliminarPlato = (event) => {
    event.preventDefault()
    const { value } = event.target;
    let arrayNombre = [];
    arrayNombre = valorTipoPlato.nombre.filter((elementoDos) => {
          return elementoDos !== value;
    });
                    
    setValorTipoPlato({
      error: "",
      nombre: [...arrayNombre],
      
    });
    
  };

  const handleEliminarDieta = (event) => {
    event.preventDefault()
    const { name } = event.target;
    let arrayNombre = [];
    let arrayDieta=[];
    let aux = valorTipoDieta.dieta.indexOf(name);
    
    
        arrayNombre = valorTipoDieta.nombre.filter((elementoDos) => {
          return elementoDos !== name;
           
        });
      
          if (aux > -1) {
            arrayDieta = valorTipoDieta.dieta.filter((elementoTres) => {
              return elementoTres !== aux;
               
            });
          }
        

    
    setValorTipoDieta({
      error: "",
      dieta: [...arrayDieta],
      nombre: [...arrayNombre],
      
    });
    
  };


  const handleTextArea= (event)=>{
    const { value } = event.target;
    serValorTextArea({ text: value, error: "" });
    if(value.length===0){
      serValorTextArea({ text: value, error: "Campo obligatorio" });
    }

  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrorSubmit("")
    if(valorTitle.title.length && valorTipoDieta.dieta.length && valorTipoPlato.nombre.length && valorNivelSaludable.title.length && valorTextArea.text.length){
      if(!valorTitle.error.length && !valorTipoDieta.error.length && !valorTipoPlato.error.length && !valorNivelSaludable.error.length && !valorTextArea.error.length){
     
        const paquetePost = {
          title: valorTitle.title,
          image: "https://fripozo.com/wp-content/uploads/icon-recetas.png",
          puntuacion: Math.floor(Math.random()*(1+100)),
          nivel_saludable: Number(valorNivelSaludable.title),
          paso_paso: valorTextArea.text,
          tipo_plato: valorTipoPlato.nombre,
          tipo_dieta: valorTipoDieta.dieta
        }

        postRecipe(paquetePost);
        setDataCargada(true);
      }else{
        setErrorSubmit("Digite Correctamente los datos del formulario")
      }

    }else {
      setErrorSubmit("Digite en los campos requeridos")
    }

  }
  return (
    
 <form className="formulario"onSubmit={(e) => handleSubmit(e)}>
   <div className="contenedorFormulario">
     <img src="https://fripozo.com/wp-content/uploads/icon-recetas.png" width="200px"/>
      <label className="titulos"htmlFor="title" type="text" >
        Titulo de Receta
      </label>
      <input
        className={valorTitle.error.length>0?"InputFail":"InputCorrect"}
        name="title"
        id="title"
        value={valorTitle.title}
        placeholder="Pasta"
        onChange={(e) => handleTitle(e)}
      />
      {valorTitle.error.length > 0 && <p>{valorTitle.error}</p>}
      <label className="titulos" htmlFor="nivelSaludable">Nivel Saludable</label>
      <input
        className={valorNivelSaludable.error.length>0?"InputFail":"InputCorrect"}
        name="nivelSaludable"
        id="nivelSaludable"
        placeholder="Entre 1/100"
        value={valorNivelSaludable.title}
        onChange={(e) => handleNivelSaludable(e)}
      />
      {valorNivelSaludable.error.length > 0 && (
        <p>{valorNivelSaludable.error}</p>
      )}
      <label className="titulos"htmlFor="tipoPlato">Tipo de plato</label>
      <select id="tipoPLato" className={valorTipoPlato.error.length>0?"selectFail":"selectCorret"}>
        <option value="0" onClick={(e) =>{handleTipoPlato(e)}}>Click...</option>
        <option value="Side dish" onClick={(e)=> handleTipoPlato(e)} >Side dish/Guarnición</option>
        <option value="Lunch" onClick={(e)=> handleTipoPlato(e)} >Lunch/Comida</option>
        <option value="Main course" onClick={(e)=> handleTipoPlato(e)} >Main course/Plato principal</option>
        <option value="Main dish" onClick={(e)=> handleTipoPlato(e) }>Main dish/Plato principal</option>
        <option value="Dinner" onClick={(e)=> handleTipoPlato(e)} >Dinner/Cena</option>
        <option value="Morning" onClick={(e)=> handleTipoPlato(e)} >Morning meal/Comida de la mañana</option>
        <option value="Brunch" onClick={(e)=> handleTipoPlato(e)} >Brunch/Desayuno tardio</option>
        <option value="Breakfast"onClick={(e)=> handleTipoPlato(e)} >Breakfast/Desayuno</option>
        <option value="Soup" onClick={(e)=> handleTipoPlato(e)} >Soup/Sopa</option>
      </select>
      <div className="contenedorBotonesFinales">
      {valorTipoPlato.nombre.map((elemento) => {
        return (
      
          <button className="botonesFinales" value={elemento} onClick={(e) => handleEliminarPlato(e)}>{elemento}</button>
        )
      })}

      </div>

      {valorTipoPlato.error.length>0 && <p>{valorTipoPlato.error}</p>}


      <label className="titulos" htmlFor>Tipo de dieta</label>
      <select className={valorTipoDieta.error.length>0?"selectFail":"selectCorret"} id="tipoDieta">
        <option name="0" value="0" onClick={(e) =>handleTipoDieta(e)}>
          Click...
        </option>
        <option
          name="Gluteen Free"
          value="1"
          onClick={(e) => handleTipoDieta(e)}
        >
          Gluten Free
        </option>
        <option name="Ketogenic" value="2" onClick={(e) => handleTipoDieta(e)}>
          Ketogenic
        </option>
        <option name="Vegetarian" value="3" onClick={(e) => handleTipoDieta(e)}>
          Vegetarian
        </option>
        <option
          name="Lacto-Vegetarian"
          value="4"
          onClick={(e) => handleTipoDieta(e)}
        >
          Lacto-Vegetarian
        </option>
        <option
          name="Ovo-Vegetarian"
          value="4"
          onClick={(e) => handleTipoDieta(e)}
        >
          Ovo-Vegetarian
        </option>
        <option name="Vegan" value="6" onClick={(e) => handleTipoDieta(e)}>
          Vegan
        </option>
        <option name="Pescetarian" value="7" onClick={(e) => handleTipoDieta(e)}>
          Pescetarian
        </option>
        <option name="Paleo" value="8" onClick={(e) => handleTipoDieta(e)}>
          Paleo
        </option>
        <option name="Primal" value="9" onClick={(e) => handleTipoDieta(e)}>
          Primal
        </option>
        <option name="Whole30" value="10" onClick={(e) => handleTipoDieta(e)}>
          Whole30
        </option>
      </select>
      <di className=".contedorBotonesFinales">
      { 
        valorTipoDieta.nombre.map((elemento) => {
          return(
          
          <button className="botonesFinales"name={elemento} onClick={(e) => handleEliminarDieta(e)}>
            {elemento}
          </button>)
          
            
        })
      }
      </di>

      {valorTipoDieta.error.length > 0 && <p>{valorTipoDieta.error}</p>}

      <label className="titulos" htmlFor="instrucciones" className="titulos">Instrucciones</label>
      <textarea id="instrucciones" className={valorTextArea.error.length>0?"InputFail":"InputCorrect"}
      placeholder="Juntomas un par de ingredientes, alistamos ciertos recipientes...."
       type="text" value={valorTextArea.text} onChange={(e) => handleTextArea(e)}></textarea>
      {valorTextArea.error && <p>{valorTextArea.error}</p>}

      <div className="contedorBotonesFinales">
      <button className="botonesFinales"name="enviar" type="submit" onClick={(e) =>{handleSubmit(e)}}>
        Agregar
      </button>
      <button className="botonesFinales"onClick={() => window.history.go(-1)}>Regresar</button>
      </div>

     
      {errorSubmit.length>0 && <p>{errorSubmit}</p>}
      {dataCargada && <h1>¡Receta Agregada!</h1>}
      </div>
    </form>



    
     );
}

export default connect(null, {postRecipe})(Formulario);
