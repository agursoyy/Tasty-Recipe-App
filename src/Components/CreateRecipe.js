import React from 'react';
import {connect} from 'react-redux';
import {recipeActions} from '../js/actions';
import styles from '../styles/createRecipe.module.scss';

class CreateRecipe extends React.Component {
    constructor(props) {
        super(props);
            
        this.state = {
            categoryId: -1,
            recipeName: "",
            prepTimeMins: -1,
            cookTimeMins: -1,
            yieldServingsLow: -1,
            yieldServingsHigh: -1,
            directions: [{ direction: "" }],
            ingredientId: -1,
            ingredients: []   /// {ingredientId:1, amount: "250gram"}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddIngredient = this.handleAddIngredient.bind(this);
        this.handleIngredientAmountChange = this.handleIngredientAmountChange.bind(this);
        this.handleIngredientAmountRemove = this.handleIngredientAmountRemove.bind(this);
        this.handleAddDirection = this.handleAddDirection.bind(this);
        this.handleRemoveDirection = this.handleRemoveDirection.bind(this);
        this.handleDirectionChange = this.handleDirectionChange.bind(this); 
        this.handleElementValidation = this.handleElementValidation.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.props.fetchAllCategories();
        this.props.fetchAllIngredients();
        setTimeout(() => {
            console.log(this.props);
        }, 2000);
    }
    alert() {
        const {alert} = this.props;
        if(alert && alert.type==="alert-danger" && alert.message)
        {
          return <div className={`alert ${alert.type} ${styles.alertMsg}`}>{alert.message}</div>
        }
    }
    handleAddDirection = () => {
        this.setState({
          directions: this.state.directions.concat([{ direction: "" }])
        });
      };
    
      handleRemoveDirection = idx => () => {
        if(this.state.directions.length > 1)
        this.setState({
          directions: this.state.directions.filter((s, sidx) => idx !== sidx)
        });
      };
      handleDirectionChange = idx => evt => {
        const newDirections = this.state.directions.map((direction, sidx) => {
          if (idx !== sidx) return direction;
          return { ...direction, direction: evt.target.value };
          
        });
        this.setState({ directions: newDirections });
      };
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
        this.handleElementValidation(event);
      }
    categoryListOptions() {
        const {categories} = this.props;
        if(categories) {
            const mapped = categories.map((c,index) =>{
                return <option key={c.id} value={c.id}>{c.name}</option>       
            });
            return [<option key={-1} value={-1} disabled>Select your recipe category</option>,...mapped];
        }
    }
    timeMinsOptions(placeholder) {
        let result = [];
        result[0] = <option key={-1} value={-1} disabled>{placeholder}</option>
        for(let i=0; i<=500; i++) {
            result[i+1] = <option key={i} value={i}>{i}</option>
        }
        return result;
    }
    yieldServingsOptions(placeholder) {
        let result = [];
        result[0] = <option key={-1} value={-1} disabled>{placeholder}</option>
        for(let i=0; i<=40; i++) {
            result[i+1] = <option key={i+1} value={i}>{i}</option>
        }
      
        return result;
    }
    ingredientListOptions() {
        const {ingredients} = this.props; 
        if(ingredients) {
            const mapped = ingredients.map((c,index) =>{
                return <option key={c.id} value={c.id}>{c.name}</option>       
            });
            return [<option key={-1} value={-1} disabled>Add a new ingredient</option>,...mapped];
        }
    }
    handleAddIngredient(event) {
        const selectedIngID = Number(event.target.value);
        this.setState({
            ingredients: this.state.ingredients.concat([{id: selectedIngID, amount: "" }])
        });
        document.getElementById(`addIngredient`).classList.remove(styles.recipeInputError);
    }

    handleIngredientAmountRemove = idx => () => {
        this.setState({
          ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
        });
      };
    getIngredientName(id) {
      const {ingredients} = this.props; 
        if(ingredients) {
            for(let i=0; i<ingredients.length; i++) {
                if(ingredients[i].id === id) {
                    return ingredients[i].name;
                }
            }
        }
       
    }
    ingredientAmountInputs() {
        return (
            this.state.ingredients.map((ingredient,idx) => (
                <div className={`form-group ${styles.formGroup} ${styles.ingredientAmountContainer}`} key={idx}>
                    <label>{this.getIngredientName(ingredient.id)}</label>
                    <div className={styles.ingredientAmount}>
                        <input type="text"
                        className= {`form-control  shadow-sm`}
                        placeholder={`Please specify the amount`}
                        id={`ingredientAmount${idx}`}
                        value={ingredient.amount}
                        onChange = {this.handleIngredientAmountChange(idx)}></input>
                        <button
                        type="button"
                        onClick={this.handleIngredientAmountRemove(idx)}
                        className={`btn btn-sm btn-danger shadow-sm ${styles.removeElementBtn}`}
                    >
                        <i className="fa fa-minus-circle"></i>
                    </button>
                    </div>
                  
                </div>
            ))
        )
    }
    handleIngredientAmountChange = idx => evt => {
        const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
          if (idx !== sidx) return ingredient;
          return { ...ingredient, amount: evt.target.value };
        });
        this.setState({ ingredients: newIngredients });
    };
    directions() {
        return(
            this.state.directions.map((direction, idx) => (
                <div className={styles.direction} key={idx}>
                  <input
                    type="text"
                    className= {`form-control  shadow-sm`}
                    placeholder={`Direction#${idx + 1}`}
                    id={`direction${idx}`}
                    value={direction.direction}
                    onChange = {this.handleDirectionChange(idx)}
                  />
                  <button
                    type="button"
                    onClick={this.handleRemoveDirection(idx)}
                    className={`btn btn-sm btn-danger shadow-sm ${styles.removeElementBtn}`}
                  >
                    <i className="fa fa-minus-circle"></i>
                  </button>
                </div>
            ))
        );
    }
    handleElementValidation(event) {

        const name = event.target.name;
        const value = event.target.value;
        const id=event.target.id;
        const el = document.getElementById(id);
        if(name === 'categoryId' ||name === "prepTimeMins" ||
            name === "cookTimeMins" || name=== "yieldServingsLow" ||name === "yieldServingsHigh" ) {
            if(value === -1) {
                el.classList.add(styles.recipeInputError);
            }
            else 
                el.classList.remove(styles.recipeInputError);
        }
        else if(name === 'recipeName') {
            if(!value) {
                el.classList.add(styles.recipeInputError);
            }
            else 
                 el.classList.remove(styles.recipeInputError);
        }
    }
    formValidation() {
        let formIsValid = true;
        if(this.state.categoryId === -1) {
            formIsValid = false;
            document.getElementById("categoryId").classList.add(styles.recipeInputError);
        }
        if(!this.state.recipeName) {
             formIsValid = false;
             document.getElementById("recipeName").classList.add(styles.recipeInputError);
        }
        if(this.state.prepTimeMins === -1) {
            formIsValid = false;
            document.getElementById("prepTimeMins").classList.add(styles.recipeInputError);
        }
        if(this.state.cookTimeMins === -1) {
            formIsValid = false;
            document.getElementById("cookTimeMins").classList.add(styles.recipeInputError);
        }
        if(this.state.yieldServingsLow === -1) {
            formIsValid = false;
            document.getElementById("yieldServingsLow").classList.add(styles.recipeInputError);
        }
        if(this.state.prepTimeMins === -1) {
            formIsValid = false;
            document.getElementById("yieldServingsHigh").classList.add(styles.recipeInputError);
        }
        // validate direction list
        if(!this.state.directions[0].direction) {
            formIsValid = false;
            document.getElementById(`direction0`).classList.add(styles.recipeInputError);
        }  
        if(this.state.ingredients.length === 0 ) {
            formIsValid = false;
            document.getElementById(`addIngredient`).classList.add(styles.recipeInputError);
        }
        else{
            for(let i=0; i<this.state.ingredients.length; i++) 
            {
                if(!this.state.ingredients[i].amount) {
                    formIsValid = false;
                    document.getElementById(`ingredientAmount${i}`).classList.add(styles.recipeInputError);
                }
            }
        }

        return formIsValid; 
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.formValidation()) {
            const {createRecipe} = this.props;
            const recipe = {...this.state};
            delete recipe["ingredientId"];
            createRecipe(this.state);
        }
    }
    render() {
        return(
            <div className={`row ${styles.container}`}>
                <div className="col-sm-6 offset-sm-3">
                    <h2 className={`d-none d-md-block ${styles.pageTitle}`}>Create a new recipe</h2>
                    <h5 className={`d-block d-md-none ${styles.pageTitle}`}>Create a new recipe</h5>
                    {this.alert()}
                    <form onSubmit={this.handleSubmit} className={styles.recipeForm}>
                        <div className={`form-group ${styles.formGroup}`}>
                            <select name="categoryId" id="categoryId" className={`form-control shadow-sm`} value={this.state.categoryId} onChange = {this.handleInputChange}>
                                {this.categoryListOptions()}
                            </select>
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <input type="text" name="recipeName" id="recipeName" placeholder="Recipe title"  onBlur={this.handleElementValidation}
                            className={`form-control shadow-sm`} value={this.state.recipeName}  onChange = {this.handleInputChange}/>
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <select name="prepTimeMins"  id="prepTimeMins" className={`form-control shadow-sm`} value={this.state.prepTimeMins} onChange = {this.handleInputChange}>
                                {this.timeMinsOptions("Preparation time in minutes")}
                            </select>
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <select name="cookTimeMins" id="cookTimeMins" className={`form-control shadow-sm`} value={this.state.cookTimeMins} onChange = {this.handleInputChange}>
                                {this.timeMinsOptions("Cooking time in minutes")}
                            </select>
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <select name="yieldServingsLow" id="yieldServingsLow" className={`form-control shadow-sm`} value={this.state.yieldServingsLow} onChange = {this.handleInputChange}>
                                {this.yieldServingsOptions("Yield servings low")}
                            </select>
                        </div>
                        <div className={`form-group ${styles.formGroup}`}>
                            <select name="yieldServingsHigh" id="yieldServingsHigh" className={`form-control shadow-sm`} value={this.state.yieldServingsHigh} onChange = {this.handleInputChange}>
                                {this.yieldServingsOptions("Yield servings high")}
                            </select>
                        </div>
                        <div className={`${styles.ingredientContainer}`}>
                            <h6>ingredients</h6>
                            <div className={`form-group ${styles.formGroup}`}>
                                <select name="addIngredient" id="addIngredient" className={`form-control shadow-sm`} value={this.state.ingredientId} onChange = {this.handleAddIngredient}>
                                    {this.ingredientListOptions()}
                                </select>
                            </div>
                            {this.ingredientAmountInputs()}
                        </div>
                        <div className={`form-group ${styles.formGroup} ${styles.directionContainer}`}>
                            <h6>Directions</h6>
                            {this.directions()}
                            <button type="button" onClick={this.handleAddDirection} 
                            className={`btn btn-outline-info btn-block shadow-sm ${styles.addDirection}`}>
                             Add a new direction
                            </button>
                        </div>
                       
                       
                        <input type="submit" value="Post recipe" className={`btn btn-primary btn-block ${styles.submitBtn}`} />
                    </form>
                </div>
               
            </div>
        )
    }
}

function mapState(state) {
    const { categories_loading, categories } = state.recipeCategories;
    const { ingredients_loading, ingredients} = state.recipeIngredients;
    const { alert } = state;
    return { categories_loading, categories, ingredients_loading, ingredients, alert };
}
const actionCreators = {
    fetchAllCategories: recipeActions.fetchAllRecipeCategories,
    fetchAllIngredients: recipeActions.fetchAllIngredients,
    createRecipe: recipeActions.createRecipe
};

export default connect(mapState, actionCreators)(CreateRecipe);

