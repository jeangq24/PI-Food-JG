import React from "react";
import "./receta.css";
import { Link } from "react-router-dom";
import { getRecipesDetails  } from "../../actions/index.js";
import { connect } from "react-redux";
function Receta ({id, title, image, tipo_dieta, puntuacion, getRecipesDetails}) {

    const verDetalles=(e) =>{
    
        getRecipesDetails(id)
    }
    
    return (
        <Link className="text-link" to={"/details"} onClick={(e)=>verDetalles(e)}>
            <div className="ContenedorRecetaIndividual">
            <h3>{title}</h3>
            <h5 className="tituloDieta">Tipo de dieta</h5>
            <h6 className="contenidoDieta">{tipo_dieta?tipo_dieta:"dieta no registrada"}</h6>
            <h5 className="tituloPuntaje">Puntaje</h5>
            <h6 className="contenidoPuntaje">{puntuacion}</h6>
            <img className="contenedorImagen" src={image} alt={`Alguna receta representativa de ${title}`}/>
        </div>
        </Link>
      
    )

   
}
const mapStateToProps = (state) => {
    return {
        Recipes: state.RecipesDetails,

    };
}
export default connect(mapStateToProps, {getRecipesDetails})(Receta);