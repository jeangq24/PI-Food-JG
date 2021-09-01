import React, { useState } from "react";
import { connect } from "react-redux";
import { getRecipes, setValue } from "../../actions/index.js";
import "./buscador.css";
function Buscador({ setValue, getRecipes }) {
  const [valorInput, setvalorInput] = useState("");

  const handleChache = (event) => {
    setvalorInput(event.target.value);
    
    if (event.target.value.length !== 0) {
      event.preventDefault();
      getRecipes(event.target.value)
    }else{
      setValue()
    }
    
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    getRecipes(valorInput);
  };

  return (
    <div className="contenedorBuscador">
      <form  className="buscadorF"onSubmit={(e) => handleSubmit(e)}>
        <label className="labelBuscador" htmlFor="inputBuscador">
          Buscar
        </label>
        <input
          id="inputBuscador"
          type="text"
          value={valorInput}
          onChange={(e) => handleChache(e)}
        />
        
      </form>
      <div className="contenedorIMG"></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    Recipes: state.Recipes,
  };
};

export default connect(mapStateToProps, { getRecipes, setValue })(Buscador);
