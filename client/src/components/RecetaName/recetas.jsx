import React, { useEffect, useState, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { getRecipesList } from "../../actions/index.js";
import "./recetas.css";
const R = lazy(() => import("./receta.jsx"));

function Recetas({ RecipesList, Recipes, getRecipesList }) {
  const [valorPagina, setValorPagina] = useState(0);
  const [valorRenderiza, setValorRenderiza] = useState("Home");
  const [valorFiltradoActual, setValorFiltradoActual] = useState(RecipesList);

  useEffect(() => {
    getRecipesList();
    regresoHome()
 
  }, [getRecipesList]);

  const listaPorPaginacion = () => {
    if (Recipes.length === 0) {
      switch (valorRenderiza) {
        case "Home":
          
          return RecipesList.slice(valorPagina, valorPagina + 9);

        case "Gluten Free":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Ketogenic":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Vegetarian":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Lacto":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Ovo":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Vegan":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Pescetarian":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Paleo":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Primal":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Whole30":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Ascendente":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Descendente":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Min":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Max":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);
        
    
      }
    } else {
      switch (valorRenderiza) {
        case "Home":
          return Recipes.slice(valorPagina, valorPagina + 9);

        case "Gluten Free":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Ketogenic":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Vegetarian":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Lacto":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Ovo":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Vegan":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Pescetarian":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Paleo":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Primal":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Whole30":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Ascendente":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Descendente":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Min":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        case "Max":
          return valorFiltradoActual.slice(valorPagina, valorPagina + 9);

        default:
          return Recipes.slice(valorPagina, valorPagina + 9);
      }
    }
  };

  const siguientePagina = () => {
    if (
      valorFiltradoActual.slice(valorPagina, valorPagina + 9).length >
        Math.floor(valorFiltradoActual.length / 9) &&
      valorFiltradoActual.slice(valorPagina + 9, valorPagina + 9 + 1).length > 0
    ) {
      setValorPagina(valorPagina + 9);
    }
  };

  const anteriorPagina = () => {
    if (valorPagina > 0) {
      setValorPagina(valorPagina - 9);
    }
  };

  const filtroTipoDieta = (event) => {

    setValorPagina(0);
    setValorRenderiza(event.target.value);
    if (Recipes[0]) {
      setValorFiltradoActual(
        Recipes.filter((elemento) =>
          elemento.diets.toString().includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setValorFiltradoActual(
        RecipesList.filter((elemento) =>
          elemento.diets.toString().includes(event.target.value.toLowerCase())
        )
      );
    }
  };

  const filtroAscDesc = (event) => {
    setValorPagina(0);
    setValorRenderiza(event.target.value);
    if (Recipes[0]) {
      if (event.target.value === "Ascendente") {
        setValorFiltradoActual(
          Recipes.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          })
        );
      }
      if (event.target.value === "Descendente") {
        setValorFiltradoActual(
          Recipes.sort((a, b) => {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          })
        );
      }
    } else {
      if (event.target.value === "Ascendente") {
        setValorFiltradoActual(
          RecipesList.sort((a, b) => {
            if (a.title > b.title) {
              return 1;
            }
            if (a.title < b.title) {
              return -1;
            }
            return 0;
          })
        );
      }
      if (event.target.value === "Descendente") {
        setValorFiltradoActual(
          RecipesList.sort((a, b) => {
            if (a.title < b.title) {
              return 1;
            }
            if (a.title > b.title) {
              return -1;
            }
            return 0;
          })
        );
      }
    }
  };

  const filtradoPuntuacion = (event) => {
    setValorPagina(0);
    setValorRenderiza(event.target.value);
    if (Recipes[0]) {
      if (event.target.value === "Max") {
        setValorFiltradoActual(
          Recipes.sort((a, b) => {
            if (a.puntuacion < b.puntuacion) {
              return 1;
            }
            if (a.puntuacion > b.puntuacion) {
              return -1;
            }
            return 0;
          })
        );
      }
      if (event.target.value === "Min") {
        setValorFiltradoActual(
          Recipes.sort((a, b) => {
            if (a.puntuacion > b.puntuacion) {
              return 1;
            }
            if (a.puntuacion < b.puntuacion) {
              return -1;
            }
            return 0;
          })
        );
      }
    } else {
      if (event.target.value === "Max") {
        setValorFiltradoActual(
          RecipesList.sort((a, b) => {
            if (a.puntuacion < b.puntuacion) {
              return 1;
            }
            if (a.puntuacion > b.puntuacion) {
              return -1;
            }
            return 0;
          })
        );
      }
      if (event.target.value === "Min") {
        setValorFiltradoActual(
          RecipesList.sort((a, b) => {
            if (a.puntuacion > b.puntuacion) {
              return 1;
            }
            if (a.puntuacion < b.puntuacion) {
              return -1;
            }
            return 0;
          })
        );
      }
    }
  };

  const regresoHome = () => {
    setValorPagina(0);
    setValorRenderiza("Home");
    if (Recipes[0]) {
      setValorFiltradoActual(Recipes);
    } else {
      setValorFiltradoActual(RecipesList);
    }
  };
  return (
    <div className="ContenedorRecetas">
      <div className="ContenedorBotones">
        <button className="botonAnterior"onClick={anteriorPagina}>Pagina Anterior</button>

        <button className="botonSiguiente" onClick={siguientePagina}>Pagina Siguiente</button>

        <select name="filtrados" className="filtrados">
          <option selected>Filtrado por...</option>
          <optgroup label="Tipo de dieta">
            <option value="Gluten Free" onClick={(e) => filtroTipoDieta(e)}>
              Gluten Free
            </option>
            <option value="Ketogenic" onClick={(e) => filtroTipoDieta(e)}>
              Ketogenic
            </option>
            <option value="Vegetarian" onClick={(e) => filtroTipoDieta(e)}>
              Vegetarian
            </option>
            <option value="Lacto" onClick={(e) => filtroTipoDieta(e)}>
              Lacto-Vegetarian
            </option>
            <option value="Ovo" onClick={(e) => filtroTipoDieta(e)}>
              Ovo-Vegetarian
            </option>
            <option value="Vegan" onClick={(e) => filtroTipoDieta(e)}>
              Vegan
            </option>
            <option value="Pescetarian" onClick={(e) => filtroTipoDieta(e)}>
              Pescetarian
            </option>
            <option value="Paleo" onClick={(e) => filtroTipoDieta(e)}>
              Paleo
            </option>
            <option value="Primal" onClick={(e) => filtroTipoDieta(e)}>
              Primal
            </option>
            <option value="Whole30" onClick={(e) => filtroTipoDieta(e)}>
              Whole30
            </option>
          </optgroup>
          <optgroup label="Orden Alfabetico">
            <option value="Ascendente" onClick={(e) => filtroAscDesc(e)}>
              Ascendente
            </option>
            <option value="Descendente" onClick={(e) => filtroAscDesc(e)}>
              Descendente
            </option>
          </optgroup>

          <optgroup label="Puntuacion">
            <option value="Max" onClick={(e) => filtradoPuntuacion(e)}>
              Mayor
            </option>
            <option value="Min" onClick={(e) => filtradoPuntuacion(e)}>
              Menor
            </option>
          </optgroup>
        </select>
        <button className="botonReset"onClick={regresoHome}>Resetear Listado</button>
      </div>
      <div className="ContenedorRecipes">
      {listaPorPaginacion()[0] ? (
        listaPorPaginacion().map((r) => {
          return (
            <Suspense fallback={<h1>Cargando...</h1>}>
              <R
                key={r.id}
                id={r.id}
                title={r.title}
                tipo_dieta={r.diets.toString("")}
                puntuacion={r.puntuacion}
                image={r.image}
              />
            </Suspense>
          );
        })
      ) : (
        <h1>NO CONTENIDO</h1>
      )}   
      </div>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    Recipes: state.Recipes,
    RecipesList: state.RecipesList,
  };
};

export default connect(mapStateToProps, { getRecipesList })(Recetas);
