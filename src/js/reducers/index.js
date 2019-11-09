import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users,authenticatedUser} from './users.reducer';
import { alert } from './alert.reducer';
import {recipes, recipeCategories, recipeIngredients, createRecipe} from './recipe.reducer';
const rootReducer = combineReducers({
  authentication,
  registration,
  authenticatedUser,
  users,
  alert,
  recipes,
  recipeCategories,
  recipeIngredients,
  createRecipe
});

export default rootReducer;