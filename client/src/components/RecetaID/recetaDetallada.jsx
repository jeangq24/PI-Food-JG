import React from "react";
import "./recetadetallada.css"

export default function RecetaD ({title, image, puntuacion, nivel_saludable, paso_paso, tipos_platos, tipo_dieta}) {
    console.log(title, image, puntuacion, nivel_saludable, paso_paso, tipos_platos, tipo_dieta)
    return (
        <div className="ContenedorDetalles">
            <h1 className="paratodos">{title}</h1>
            <h3 className="paratodos">Tipos dietas: {tipo_dieta}</h3>
            <h3 className="paratodos">Tipos de platos: {tipos_platos}</h3>
            <h5 className="paratodos">Puntaje: {puntuacion}</h5>
            <h5 className="paratodos">Puntuacion Saludable: {nivel_saludable}</h5>
            <h6 className="paratodos">Instrucciones: {paso_paso}</h6>
            <img className="contenedorImagen" src={image} alt={`Alguna receta representativa de ${title}`}/>
        </div>
    )
}


