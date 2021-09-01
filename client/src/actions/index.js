export function getRecipes(nameRecipe) {
  return function (dispatch) {
    fetch(`http://localhost:3001/recipe?name=${nameRecipe}`)
      .then((respuesta) => respuesta.json())
      .then((data) => dispatch({ type: "GET_NAME_RECIPES", payload: data }))
      .catch((error) => error);
  };
}

export function getRecipesList() {
  return function (dispatch) {
    fetch(`http://localhost:3001/recipe`)
      .then((respuesta) => respuesta.json())
      .then((data) => dispatch({ type: "GET_LIST_RECIPES", payload: data }))
      .catch((e) => console.log(e));
  };
}

export function setValue() {
  return {
    type: "RESET_VALUE",
    payload: [],
  };
}

export function getRecipesDetails(id) {
  return function (dispatch) {
    fetch(`http://localhost:3001/recipe/${id}`)
      .then((respuesta) => respuesta.json())
      .then((data) => dispatch({ type: "GET_RECIPES_DETAILS", payload: data }))
      .catch((e) => console.log(e));
  };
}

export function postRecipe(paquetePost) {
  return function (dispatch) {
    
    fetch("http://localhost:3001/recipe", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paquetePost),
    })
    .then((respuesta)=> respuesta.json)
    .then((data) =>  dispatch({type: "POST_RECIPE", payload: data }))
    .catch(e=>console.log(e))
    
  };
}
