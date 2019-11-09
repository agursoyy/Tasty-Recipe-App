import axios from 'axios';
import { ALL_RECIPES_URI,RECIPE_BY_ID_URI, RECIPE_CATEGORIES_URI,INGREDIENTS_URI,
CREATE_RECIPE  } from './service-urls';
import {authHeader} from '../helpers';
export const recipeService = {
    fetchAllRecipes,
    fetchRecipeByID,
    fetchAllCategories,
    fetchAllIngredients,
    createRecipe
}
function fetchAllRecipes(page) {
    return axios.get(ALL_RECIPES_URI(page)).then(res => res.data);
}
function fetchRecipeByID(id) {
    return axios.get(RECIPE_BY_ID_URI(id)).then(res => res.data);
}
function fetchAllCategories() {
    return axios.get(RECIPE_CATEGORIES_URI).then(res => res.data);
}
function fetchAllIngredients() {
    return axios.get(INGREDIENTS_URI).then(res => res.data);
}

function createRecipe(recipe) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json'},
    };
    return axios.post(CREATE_RECIPE,recipe, requestOptions);
}