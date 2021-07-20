import jwtDecoder from "jwt-decode";

import {
    S_ADMIN_LOGIN_REQUEST,
    S_ADMIN_LOGIN_SUCCESS,
    S_ADMIN_LOGIN_FAILURE,
    S_ADMIN_API_LOAD_INITIALIZE,
    S_ADMIN_INITIAL_API_LOAD_SUCCESS,
    S_ADMIN_LOGOUT,
} from "./sAdminLoginTypes";

let token = JSON.parse(localStorage.getItem("superAdminToken"));
let validToken = false;

if (token) {
    let decodedToken = jwtDecoder(token);

    if (decodedToken.exp < Date.now() / 1000) {
        localStorage.removeItem("superAdminToken");
    } else {
        validToken = true;
    }
}

const initialState = validToken ?
    {
        loggedIn: true,
        loggingIn: false,
        error: "",
        token: JSON.parse(localStorage.getItem("superAdminToken")),
        apiLoaded: true,
    } :
    {};

const sAdminLoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
                loggedIn: false,
                email: action.payload.email,
                token: JSON.parse(localStorage.getItem("superAdminToken")),
            };

        case S_ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                email: action.payload.email,
                token: JSON.parse(localStorage.getItem("superAdminToken")),
            };

        case S_ADMIN_LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                email: null,
                error: action.payload.error.response.status,
                token: JSON.parse(localStorage.getItem("superAdminToken")),
            };

        case S_ADMIN_LOGOUT:
            return {};

        case S_ADMIN_API_LOAD_INITIALIZE:
            return {
                ...state,
                apiLoaded: false,
            };

        case S_ADMIN_INITIAL_API_LOAD_SUCCESS:
            return {
                ...state,
                apiLoaded: true,
            };

        default:
            return state;
    }
};

export default sAdminLoginReducer;