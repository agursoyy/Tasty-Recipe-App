import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {userActions} from '../js/actions';
import '../styles/navbar.scss';
class authenticatedNavbar extends React.Component {
    logOut() {
        const {logout} = this.props;
        logout();
    }
    render() {
        const {loggedIn, loading, user} = this.props;
        if(loading) {
            return(
                <ul className="navbar-nav ml-auto mr-2">
                <h5>loading...</h5>

                </ul>
            )
        }
        if(!loggedIn) {
            return (
                <ul className="navbar-nav ml-auto mr-2">
                    <li className="nav-item">
                        <div className="account">
                                <NavLink to="/login">
                                    <i className="fas fa-user-circle login-icon p-2"></i>
                                </NavLink>
                                <NavLink to="/signup" className="signup-link">Create an account</NavLink>                                       
                            </div>
                    </li>
                </ul>  
            );
        }
        else   // this means user logged in
        return(
            <>
                {
                    user &&
                    <ul className="navbar-nav ml-auto">
                        <li className="dropdown nav-item authenticated-user">
                            <a className="nav-link dropdown-toggle authenticated-user-toggler" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <span className="mr-2">
                                    Hoşgeldiniz, 
                                </span>
                                <span>
                                    <i>{user.firstName} {user.lastName}</i>
                                </span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right  authenticated-user-menu">
                                <Link to='/favori-filmlerim?page=1' className="btn btn-link nav-link dropdown-item">Favoriler</Link>
                                <button onClick={this.logOut.bind(this)} className="btn btn-link nav-link dropdown-item">Çıkış Yap</button>
                            </div>
                        </li>
                    </ul> 
                }
            </>
        )
    }   
}
function mapState(state) {
    const { loggedIn } = state.authentication;
    const {loading, user} = state.authenticatedUser;
    const { alert } = state;
    return { loggedIn,loading, user, alert};
}
const actionCreators = {
    logout: userActions.logout,
};

export default connect(mapState, actionCreators)(authenticatedNavbar);
