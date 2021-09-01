import React, { lazy, Suspense } from "react";
import { connect } from "react-redux";
import "./recetadetallada.css"
const RecetaD = lazy(() => import("../RecetaID/recetaDetallada.jsx"));


function RecetasDetails({ RecipesDetails }) {
  const volverLista = () => {
    window.history.go(-1);
  };

  return (
    <div>
      <div className="contenedorB">
      <button className="botonRegreso" type="submit" onClick={volverLista}>
        Regresar
      </button>
      </div>
      
      {RecipesDetails.map((elemento) => {
        return (
          <Suspense fallback="Cargando...">
            <RecetaD
              title={elemento.title}
              image={elemento.image}
              puntuacion={elemento.puntuacion}
              nivel_saludable={elemento.nivel_saludable}
              paso_paso={elemento.paso_paso}
              tipos_platos={elemento.tipos_platos}
              tipo_dieta={elemento.tipo_dieta}
            />
          </Suspense>
        );
      })}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    RecipesDetails: state.RecipeDetails,
  };
};
export default connect(mapStateToProps, null)(RecetasDetails);
