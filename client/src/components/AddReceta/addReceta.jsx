import React from "react";
import { Link } from "react-router-dom";
import "./addreceta.css";
export default function AddReceta() {
  return (
    <div className="contenedorAdd">
      <Link to="/agregarReceta">
        <button className="botonAdd" type="submit">Agregar Receta</button>
      </Link>
      
    
      <Link to="/">
        <button className="botonAdd">Salir</button>
      </Link>
    </div>
  );
}
