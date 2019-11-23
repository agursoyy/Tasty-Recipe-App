import axios from 'axios';
import {authHeader} from '../helpers';
export const recipeService = {
    fetchAllRecipes,
    fetchRecipeByID,
    fetchAllCategories,
    fetchAllIngredients,
    createRecipe
}
function fetchAllRecipes(page) {
    const ALL_RECIPES_URI_PAGE = process.env.REACT_APP_ALL_RECIPES_URI + page;
    console.log(ALL_RECIPES_URI_PAGE);
    return axios.get(ALL_RECIPES_URI_PAGE).then(res => res.data);
}
function fetchRecipeByID(id) {
    const RECIPE_BY_ID_URI_ID = process.env.REACT_APP_RECIPE_BY_ID_URI + id;
    return axios.get(RECIPE_BY_ID_URI_ID).then(res => res.data);
}
function fetchAllCategories() {
    const RECIPE_CATEGORIES_URI = process.env.REACT_APP_RECIPE_CATEGORIES_URI;
    return axios.get(RECIPE_CATEGORIES_URI).then(res => res.data);
}
function fetchAllIngredients() {
    const INGREDIENTS_URI = process.env.REACT_APP_INGREDIENTS_URI;
    return axios.get(INGREDIENTS_URI).then(res => res.data);
}

function createRecipe(recipe) {
    const CREATE_RECIPE_URI = process.env.REACT_APP_CREATE_RECIPE_URI;
    console.log(CREATE_RECIPE_URI);

    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json'},
    };
    return axios.post(CREATE_RECIPE_URI,recipe, requestOptions);
}
