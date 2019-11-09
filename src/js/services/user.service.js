import { authHeader, session} from '../helpers';
import { LOGIN_URI,SIGNUP_URI,AUTHENTICATED_USER_URI } from './service-urls';
import axios from 'axios';
const dotenv = require("dotenv");
dotenv.config();
export const userService = {
    login,
    logout,
    register,
    authenticatedUser
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }; 
    const loginData = {
        email,password
    }; 
    return axios.post(LOGIN_URI, loginData, requestOptions)
    .then(res => {
        //localStorage.setItem('user', JSON.stringify(res.data));
        session.setSessionCookie(JSON.stringify(res.data))
        return res.data;
    });
}

function logout() {
    session.removeSessionCookie();
}


function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    };
    return axios.post(SIGNUP_URI,user, requestOptions);
}

function authenticatedUser() {
    const requestOptions = {
        method: 'GET',
        headers: {...authHeader()}
    }
    return axios.get(AUTHENTICATED_USER_URI, requestOptions).then(res => {
        return res.data;
    });
  
}