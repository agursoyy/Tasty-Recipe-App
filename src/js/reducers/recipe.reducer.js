import {recipeConstants} from '../constants';

export function recipes(state={},action) {
    switch(action.type) {
        case recipeConstants.GETALL_RECIPES_REQUEST: 
            return {loading: true, page: action.page};
        case recipeConstants.GETALL_RECIPES_SUCCESS:
            return {recipes: action.recipes};
        case recipeConstants.GETALL_RECIPES_FAILURE:
            return {};

        case recipeConstants.GET_RECIPE_REQUEST:
            return {loading: true, id: action.id};
        case recipeConstants.GET_RECIPE_SUCCESS:
            return {recipe: action.recipe};
        case recipeConstants.GET_RECIPE_FAILURE:
            return {};
        
        default: 
            return state;
    }
}

export function recipeCategories(state={}, action) {
    switch(action.type) {
           
        case recipeConstants.GET_RECIPE_CATEGORIES_REQUEST: 
            return {loading: true};
        case recipeConstants.GET_RECIPE_CATEGORIES_SUCCESS:
            return {categories: action.categories};
        case recipeConstants.GET_RECIPE_CATEGORIES_FAILURE:
            return {};
        default: 
            return state;
    }
}

export function recipeIngredients(state={},action) {
    switch(action.type) {
        case recipeConstants.GETALL_INGREDIENTS_REQUEST:
            return {loading: true};
        case recipeConstants.GETALL_INGREDIENTS_SUCCESS:
            return {ingredients: action.ingredients};
        case recipeConstants.GETALL_INGREDIENTS_FAILURE: 
            return {};
        default:
            return state;
            
    }
}

export function createRecipe(state={},action) {
    switch (action.type) {
        case recipeConstants.CREATE_RECIPE_REQUEST:
          return { creating_recipe: true };
        case recipeConstants.CREATE_RECIPE_SUCCESS:
          return {};
        case recipeConstants.CREATE_RECIPE_FAILURE:
          return {};
        default:
          return state
      }
}