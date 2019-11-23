import React from 'react';
import {connect} from 'react-redux';
import { recipeActions } from '../js/actions';
import queryString from 'query-string'  

import Recipe from './Recipe';
import loading from './Loading';
import styles from '../styles/recipeList.module.scss';
import Loading from './Loading';

class RecipeList extends React.Component {
    componentDidMount() {
       this.fetchAllRecipes();
    }
    getQueryValues() {
        const values = queryString.parse(this.props.location.search)
        return values;
    }
    getCurrentPage() {
        if(!this.getQueryValues().page)
            return 1
        else
            return this.getQueryValues().page
    }
    fetchAllRecipes() {
        const {fetchAllRecipes} = this.props;
        const page = this.getCurrentPage();
        console.log(page);
        fetchAllRecipes(page);
    }
    render(){
        
        console.log(this.props.recipes);
        const {loading, recipes, alert} = this.props;
        if(loading || (!recipes && alert.type !== "alert-danger")) {
            return(
                <Loading/>
            )
        }
        else if(alert.type === "alert-danger") {
            return (
                <div className={`alert ${alert.type} auth-alert`}>{alert.message}</div>
            )
        }
        else {
            const recipeList = recipes.map((recipe,index) => <div key={index} className="col-lg-3 col-md-4 col-6 mb-4">
                <Recipe recipe={recipe}/>
            </div>);
            return(
                <>
                <div className={`${styles.container} container`}>
                        <h4 className={`${styles.title}`}>{this.props.pageTitle}</h4>
                        <div className="row">
                                {recipeList}
                        </div>
                        <div className="pagination mt-3">
                        </div>
                </div>
                </>
            )
        
        }
      
    }
}
function mapState(state) {
    const { loading, recipes } = state.recipes;
    const { alert } = state;
    return { loading, recipes, alert };
}
const actionCreators = {
    fetchAllRecipes: recipeActions.fetchAllRecipes
};

export default connect(mapState, actionCreators)(RecipeList);