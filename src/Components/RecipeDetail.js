import React from 'react';
import {connect} from 'react-redux';
import { recipeActions} from '../js/actions';
import {Link} from 'react-router-dom';
import styles from '../styles/recipeDetail.module.scss';


class RecipeDetail extends React.Component {
    componentDidMount() {
        this.fetchRecipe();
     }
     getRecipeIdParam() {
        return this.props.match.params.recipeId;    
     }
     fetchRecipe() {
         const {fetchRecipeByID} = this.props;
         const id = this.getRecipeIdParam();
         fetchRecipeByID(id);
     }
     getRecipeCreationDate(date) {
        var javaDate = new Date(date).toISOString();
        var arr = javaDate.split("T");
        //return arr[0]; // this is d/m/y
        var timezone = arr[1].split(":");
        var result;
        result = arr[0];
        result = result + " "+ timezone[0]+ ":" + timezone[1];
        return result;
     }
     getRecipeDirections(directions) {
         const arr = directions.split("\n");
         return arr;
     }

    render() {
        console.log(this.props.recipe);
        const {loading, recipe, alert} = this.props;
        if(loading ||  (!recipe && alert.type !== "alert-danger")) {
            return(
                <h5>loading...</h5>
            )
        }else if(alert.type === "alert-danger") {
            return (
                <div className={`alert ${alert.type} auth-alert`}>{alert.message}</div>
            )
        } 
        else 
            return(
                <div className={`container ${styles.container}`}>
                    <div className="row">
                        <div className={`col-sm-7 ${styles.recipeContainer}`}>
                            <h2 className ={`d-none d-md-block ${styles.title}`}>{recipe.name} ({(recipe.RecipeCategory.name.toLowerCase())})</h2>
                            <h5 className={`d-block d-md-none  ${styles.title}`}>{recipe.name} ({(recipe.RecipeCategory.name.toLowerCase())}</h5>
                            <div className={styles.imgContainer}>
                                <img src={require("../assets/french.jpg")} alt="recipe_img"/>
                            </div>
                            <div className={`${styles.information}`}>
                               <div>
                                    <i class="fas fa-table"></i>
                                    <span className={styles.text}>{this.getRecipeCreationDate(recipe.createdAt)}</span>
                                </div>
                                <div>
                                    <i class="fas fa-utensils"></i>
                                    <span className={styles.text}>{recipe.yieldServingsLow}-{recipe.yieldServingsHigh} servings</span>
                                </div>
                                <div>
                                    <img src={require("../assets/prep-time.svg")} height="22" alt="prep-time-icon"/>
                                    <span className={styles.text}>{recipe.prepTimeMins} minutes</span>
                                </div>
                                <div>
                                    <i class="fas fa-clock"></i>
                                    <span className={styles.text}>{recipe.cookTimeMins} minutes</span>
                                </div>
                             
                            </div>
                            <div className={`${styles.ingredients}`}>
                                <h3 className ={`d-none d-md-block ${styles.ingredientsTitle}`}>Ingredients</h3>
                                <h5 className={`d-block d-md-none  ${styles.ingredientsTitle}`}>Ingredients</h5>
                                <hr/>
                                <ul className={`row ${styles.ingredientsList}`}>
                                    {
                                        recipe.Ingredients.map((ingredient,index) =>
                                        <li key={index} className="col-sm-6">
                                            <i class="fas fa-dot-circle mr-3"></i>
                                            {ingredient.Recipe_Ingredient.amount.toLowerCase()} {ingredient.name.toLowerCase()}
                                        </li>)
                                    }
                                </ul>
                            </div>
                            <div className={`${styles.directions}`}>
                                <h3 className ={`d-none d-md-block ${styles.directionsTitle}`}>Directions</h3>
                                <h5 className={`d-block d-md-none  ${styles.directionsTitle}`}>Directions</h5>
                                <hr/>
                                <ol className={styles.recipeDirectionsList}>
                                    { 
                                        this.getRecipeDirections(recipe.directions).map((direction,index) =>
                                        <li key={index}>
                                            {direction}
                                        </li>)
                                    }
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

function mapState(state) {
    const { loading, recipe } = state.recipes;
    const { alert } = state;
    return { loading, recipe, alert };
}
const actionCreators = {
    fetchRecipeByID: recipeActions.fetchRecipeByID
};

export default connect(mapState, actionCreators)(RecipeDetail);