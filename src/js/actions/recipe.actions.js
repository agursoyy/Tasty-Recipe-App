import { recipeConstants } from '../constants';
import { recipeService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../helpers';


export const recipeActions = {
    fetchAllRecipes,
    fetchRecipeByID,
    fetchAllRecipeCategories,
    fetchAllIngredients,
    createRecipe
};

function fetchAllRecipes(page) {
    return dispatch => {
        dispatch(request({ page }));
        setTimeout(() => {
            recipeService.fetchAllRecipes(page)
            .then(recipes => {
                dispatch(success(recipes));
                dispatch(alertActions.success("recipes obtained successfully"));
            })
            .catch(error => {
                dispatch(failure(error));
                if(error.response && error.response.status === 404) {
                    dispatch(alertActions.error(error.response.data));
                }
            })
        }, 500);  
    };

    function request(page) { return { type: recipeConstants.GETALL_RECIPES_REQUEST, page } }
    function success(recipes) { return { type: recipeConstants.GETALL_RECIPES_SUCCESS, recipes } }
    function failure(error) { return { type: recipeConstants.GETALL_RECIPES_FAILURE, error } }
}


function fetchRecipeByID(id) {
    return dispatch => {
        dispatch(request({ id }));
        setTimeout(() => {
            recipeService.fetchRecipeByID(id)
            .then(recipe => {
                dispatch(success(recipe));
                dispatch(alertActions.success("recipe obtained successfully"));
            })
            .catch(error => {
                dispatch(failure(error));
                if(error.response && error.response.status === 404) {
                    dispatch(alertActions.error(error.response.data));
                }
            })
        }, 500);  
    };

    function request(id) { return { type: recipeConstants.GET_RECIPE_REQUEST, id } }
    function success(recipe) { return { type: recipeConstants.GET_RECIPE_SUCCESS, recipe } }
    function failure(error) { return { type: recipeConstants.GETALL_RECIPES_FAILURE, error } }
}

function fetchAllRecipeCategories() {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            recipeService.fetchAllCategories()
            .then(categories => {
                dispatch(success(categories));
                dispatch(alertActions.success("categories obtained successfully"));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error("Ooops! Something went wrong while trying to fetch categories."));

                /*if(error.response && error.response.status === 404) {
                    dispatch(alertActions.error(error.response.data));
                }*/
            })
        }, 0);  
    }
    function request() { return { type: recipeConstants.GET_RECIPE_CATEGORIES_REQUEST } }
    function success(categories) { return { type: recipeConstants.GET_RECIPE_CATEGORIES_SUCCESS, categories } }
    function failure(error) { return { type: recipeConstants.GET_RECIPE_CATEGORIES_FAILURE, error } }
}

function fetchAllIngredients() {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            recipeService.fetchAllIngredients()
            .then(ingredients => {
                dispatch(success(ingredients));
                dispatch(alertActions.success("ingredients obtained successfully"));
            })
            .catch(error => {
                dispatch(failure(error));
                dispatch(alertActions.error("Ooops! Something went wrong while trying to fetch ingredients."));

                /*if(error.response && error.response.status === 404) {
                    dispatch(alertActions.error(error.response.data));
                }*/
            })
        }, 0);  
    }
    function request() { return { type: recipeConstants.GETALL_INGREDIENTS_REQUEST } }
    function success(ingredients) { return { type: recipeConstants.GETALL_INGREDIENTS_SUCCESS, ingredients } }
    function failure(error) { return { type: recipeConstants.GETALL_INGREDIENTS_FAILURE, error } }
}

function createRecipe(recipe) {
    return dispatch => {
        dispatch(request(recipe));
        setTimeout(() => {
            recipeService.createRecipe(recipe)
            .then(recipe => {
                dispatch(success(recipe));
                dispatch(alertActions.success('Recipe has been posted successfully.'));
                setTimeout(() => {
                    history.push('/'); 
                }, 2200);
            }).catch(error => {
                dispatch(failure(error));
                if(error.response && error.response.status === 400) {
                    dispatch(alertActions.error(error.response.data));
                }
            })
        }, 500);
    };

    function request(recipe) { return { type: recipeConstants.CREATE_RECIPE_REQUEST, recipe } }
    function success(recipe) { return { type: recipeConstants.CREATE_RECIPE_SUCCESS, recipe } }
    function failure(error) { return { type: recipeConstants.CREATE_RECIPE_FAILURE, error } }
}