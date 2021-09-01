import "./App.css";
import React, {Suspense, lazy}from "react";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Buscador from "./components/Buscardor/buscador.jsx";
//import Receta from "./components/RecetaName/recetas.jsx"
const Receta = lazy(()=>import( "./components/RecetaName/recetas.jsx"));
const RecetaDetails = lazy(()=>import( "./components/RecetaID/recetasDetallada.jsx"));
const AddReceta = lazy(()=>import( "./components/AddReceta/addReceta.jsx"));
const Formulario = lazy(()=>import( "./components/AddReceta/formulario.jsx"));

function App() {
  return (
    <>
      <Route exact path="/">
        <div className="App">
          <div className="contenedorint">
            <Link className="text-link" to="/home">
              <h1 id="titleP">Henry Food APP</h1>
            </Link>
            <Link to="/home">
              <button id="bingresarApp">Entrar</button>
            </Link>
          </div>
        </div>
      </Route>

      <Route exact path="/home">
        
        <Suspense fallback={<h1>Cargando...</h1>}>
          <Buscador />
          <AddReceta/>
          <Receta/>
        </Suspense>
        
      </Route>

      <Route exact path="/details"> 
      <Suspense fallback={<h1>Cargando...</h1>}>
        <RecetaDetails/>
      </Suspense>
      </Route>

      <Route exact path="/agregarReceta">
      <Suspense fallback={<h1>Cargando...</h1>}>
        <Formulario/>
      </Suspense>
      </Route>
    </>
  );
}
/* {asds: sdf: dfddg:}          [{jjidfij: dfjjsjk: skjdfjkd:}]*/
export default App;
