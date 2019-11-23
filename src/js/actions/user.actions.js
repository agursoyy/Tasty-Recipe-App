import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './alert.actions';
import { history } from '../helpers';
import {store} from '../helpers'

export const userActions = {
    login,
    logout,
    register,
    authenticatedUser
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        setTimeout(() => {
            userService.login(email,password)
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success("login is successfull, you will be redirected"));
            }).then(() => {
                setTimeout(() => {
                    history.push('/'); 
                    store.dispatch(authenticatedUser());
                }, 1000);
            })
            .catch(error => {
                dispatch(failure(error));
                if(error.response && error.response.status === 400) {
                    dispatch(alertActions.error(error.response.data));
                }
            })
        }, 500);
        
    };

    function request(email) { return { type: userConstants.LOGIN_REQUEST, email } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}
function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        setTimeout(() => {
            userService.register(user)
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success('Registration is successful, please verify your email account'));
                setTimeout(() => {
                    history.push('/login'); 
                }, 2200);
            }).catch(error => {
                dispatch(failure(error));
                if(error.response && error.response.status === 400) {
                    dispatch(alertActions.error(error.response.data));
                }
            })
        }, 500);
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function authenticatedUser() {
    console.log('AUTHENTICATED USER');
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            userService.authenticatedUser()
            .then(user => {
                dispatch(success(user));
                dispatch(alertActions.success('user fetched successfully'));
            }).catch(error => {
                dispatch(failure(error));
                if(error.response && error.response.status === 400) {
                    dispatch(alertActions.error(error.response.data));
                }
            })
        }, 500);
    };

    function request(id) { return { type: userConstants.GET_USER_REQUEST, id } }
    function success(user) { return { type: userConstants.GET_USER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.GET_USER_FAILURE, error } }
}