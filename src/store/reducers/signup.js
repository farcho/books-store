import { REGISTER_USER, REDIRECT_TO_AUTH } from '../actions/signup'
import { updateObject } from '../utility';

const initialState = {
    loading: false,
    registered: false,
}

const registerInit = (state, action) => {
    return updateObject(state, { loading: false, registered: false });
};

const registerStart = (state, action) => {
    return updateObject(state, { loading: true, registered: false });
};

const registerSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        registered: true,
    });
};

const registerFail = (state, action) => {
    return updateObject(state, { loading: false, registered: false });
};

const redirectToAuth = (state, action) => {
    window.location.href = '/auth'
}

const signUpReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER.INIT: return registerInit(state, action);
        case REGISTER_USER.START: return registerStart(state, action);
        case REGISTER_USER.SUCCESS: return registerSuccess(state, action)
        case REGISTER_USER.FAIL: return registerFail(state, action);
        case REDIRECT_TO_AUTH: return redirectToAuth(state, action)
        default: return state;
    }
};


export default signUpReducer