import React from 'react';
import styles from '../styles/recipe.module.scss';
import {Link} from 'react-router-dom';
class Recipe extends React.Component {
    
    removeSpaces(str) {
        return str.replace(/\s/g, '-')
    }
    render() {
        return(
            <div className={styles.container}>
                <Link to={`/${this.removeSpaces(this.props.recipe.name)}-recipe/${this.props.recipe.id}`} className={styles.imgContainer}>
                    <img src={require("../assets/french.jpg")} alt="recipe_img"/>
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