import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import AuthenticatedNavbar from './AuthenticatedNavbar';
import '../styles/navbar.scss';

class Navbar extends React.Component {
    render() {
        return(
                 <nav id="navbar" className="navbar navbar-expand-lg navbar-light">    
                    <div className="container">
                        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <Link to="/" className="navbar-brand mobile-brand">
                                <img src={require('../assets/logo1.png')} alt="logo"/>
                        </Link>
                        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <form class="navbar-nav mr-auto form-inline search">
                                <div className="search-box">
                                    <input class="form-control search-box-input" type="search" placeholder="Find a recipe" aria-label="Search"/>
                                    <button class="btn btn-link search-box-btn" type="submit">
                                        <i className="fa fa-search search-btn-icon"></i>
                                    </button>
                                </div>
                            </form>
                            <Link to="/recipes" className="navbar-brand">
                                <img src={require('../assets/logo11.png')} alt="logo"/>
                            </Link>
                            <AuthenticatedNavbar/>
                        </div>
                    </div>         
                </nav>
           
        )
    }
}




export default Navbar;


