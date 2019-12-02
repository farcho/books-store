import axios from '../../axios-api';
import { createActionObject } from '../utility'
import jwtDecode from 'jwt-decode'

export const AUTH_USER = createActionObject("AUTH_USER");
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const REDIRECT_TO_HOME = createActionObject('REDIRECT_TO_HOME')

export const authStart = () => {
    return {
        type: AUTH_USER.START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_USER.SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: AUTH_USER.FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: AUTH_LOGOUT
    };
};

export const redirectToHome = () => {
    return {
        type: REDIRECT_TO_HOME
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };

        axios.post('/login', authData)
            .then(response => {
                const accessToken = response.data.data.accessToken;
                const token = jwtDecode(accessToken);
                const expirationDate = new Date(token.exp * 1000);
                localStorage.setItem('token', JSON.stringify(accessToken));
                localStorage.setItem('expirationDate', JSON.stringify(expirationDate));
                localStorage.setItem('userId', JSON.stringify(token.data.userId));
                dispatch(authSuccess(token, token.data.userId));
                dispatch(redirectToHome());
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    };
};
