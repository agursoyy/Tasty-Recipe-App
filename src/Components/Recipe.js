import React from 'react';
import styles from '../styles/recipe.module.scss';
import {Link} from 'react-router-dom';
class Recipe extends React.Component {
    removeSpaces(str) {
        return str.replace(/\s/g, '-')
    }
    getImageRecipe() {
        const {recipe} = this.props;
       const img = recipe.RecipeImages.length > 0 && recipe.RecipeImages[0].image ? <img src={`data:image/jpg;base64,${recipe.RecipeImages[0].image}`} alt="rec_img"/> 
       : <img src={require("../assets/french.jpg")} alt="recipe_img"/>;
       return img;
    }
    render() {
        const {recipe} = this.props;
        return(
            <div className={styles.container}>
                <Link to={`/${this.removeSpaces(recipe.name)}-recipe/${recipe.id}`} className={styles.imgContainer}>
                    {this.getImageRecipe()}
                </Link>
                <div >
                </div>
                <div className={styles.textContainer}>
                    {this.props.recipe.name}
                </div>
            </div>
        )
    }
} 
export default Recipe;