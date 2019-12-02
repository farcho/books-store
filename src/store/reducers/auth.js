import { AUTH_USER, AUTH_LOGOUT, REDIRECT_TO_HOME } from '../actions/auth'
import { updateObject } from '../utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { token: null, userId: null });
};

const redirectToHome = (state, action) => {
    window.location.href = '/books'
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER.INIT: return authStart(state, action)
        case AUTH_USER.SUCCESS: return authSuccess(state, action)
        case AUTH_USER.FAIL: return authFail(state, action)
        case AUTH_LOGOUT: return authLogout(state, action)
        case REDIRECT_TO_HOME: return redirectToHome(state, action)
        default: return state;
    }
}

export default authReducer