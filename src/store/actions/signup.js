import axios from '../../axios-api';

import { createActionObject } from '../utility'

export const REGISTER_USER = createActionObject('REGISTER_USER')
export const REDIRECT_TO_AUTH = createActionObject('REDIRECT_TO_AUTH')

export function registerUser(userData) {
    return dispatch => {
        dispatch(registerUserStart());
        axios.post('/users', userData)
            .then(response => {
                dispatch(registerUserSuccess());
                dispatch(redirectToAuth())
            })
            .catch(error => {
                dispatch(registerUserFail(error));
            });
    };
}

export const registerUserSuccess = () => {
    return {
        type: REGISTER_USER.SUCCESS,
    };
};

export const registerUserFail = (error) => {
    return {
        type: REGISTER_USER.FAIL,
        error: error
    };
}

export const registerUserStart = () => {
    return {
        type: REGISTER_USER.START
    };
};

export const registerUserInit = () => {
    return {
        type: REGISTER_USER.INIT
    };
};

export const redirectToAuth = () => {
    return {
        type: REDIRECT_TO_AUTH
    }
}
