import React from "react";
import {Router, Switch, Route} from "react-router-dom";
import { connect } from 'react-redux'
import { history } from '../js/helpers';
import { alertActions, userActions } from '../js/actions';
import "../styles/app.scss";

import Navbar from '../Components/Navbar';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import Home from '../Components/Home';
import RecipeList from '../Components/RecipeList';
import RecipeDetail from '../Components/RecipeDetail';
import CreateRecipe from '../Components/CreateRecipe';
class App extends React.Component {
  
  componentDidMount() {
    history.listen((location, action) => {
      this.props.clearAlerts();
    });
    this.getAuthenticatedUserData();
  }
  getAuthenticatedUserData() {
    if(this.props.loggedIn) {
      this.props.authenticatedUser();
    }
  }
  render() {
    return (
         <Router history= {history}>
            <Navbar/>
            <div className="container p-0">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/recipes" render={(props) =><RecipeList key="1" {...props} pageTitle="All Recipes"/>} />
                <Route exact path="/:recipeName-recipe/:recipeId" render={(props) =><RecipeDetail {...props}/>} />
                <Route exact path="/post-recipe" component={CreateRecipe}/>
              </Switch>
            </div>
         </Router>
    )
  }
}

function mapState(state) {
  const { loggedIn } = state.authentication;
  return { loggedIn };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
  authenticatedUser: userActions.authenticatedUser
};
export default connect(mapState, actionCreators)(App);