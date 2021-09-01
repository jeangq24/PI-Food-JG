const initialState = {
  Recipes: [],
  RecipeDetails: [],
  RecipesList: [],
  PostRecipe:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_NAME_RECIPES":
      return { ...state, Recipes: [...action.payload] };
    case "GET_LIST_RECIPES":
      return { ...state, RecipesList: [...action.payload] };
    case "RESET_VALUE":
      return { ...state, Recipes: [...action.payload] };
    case "GET_RECIPES_DETAILS":
      return { ...state, RecipeDetails: [...action.payload] };
    case "POST_RECIPE":
      console.log("ENTROOOO AL REDUCER")
      console.log(action.payload)
      return { ...state, PostRecipe: [action.payload]}      
    default:
      return state;
  }
}

export default rootReducer;
