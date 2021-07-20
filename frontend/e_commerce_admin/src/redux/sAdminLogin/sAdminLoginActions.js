import {
    S_ADMIN_API_LOAD_INITIALIZE,
    S_ADMIN_INITIAL_API_LOAD_SUCCESS,
    S_ADMIN_LOGIN_FAILURE,
    S_ADMIN_LOGIN_REQUEST,
    S_ADMIN_LOGIN_SUCCESS,
    S_ADMIN_LOGOUT,
} from "./sAdminLoginTypes";

import { sAdminAuthApi } from "../../api";

export const sAdminApiLoadInitialize = () => {
    return {
        type: S_ADMIN_API_LOAD_INITIALIZE,
    };
};

export const sAdminApiLoadSuccess = () => {
    return {
        type: S_ADMIN_INITIAL_API_LOAD_SUCCESS,
    };
};

export const sAdminLoginRequest = (email) => {
    return {
        type: S_ADMIN_LOGIN_REQUEST,
        payload: { email },
    };
};

export const sAdminLoginSuccess = (email) => {
    return {
        type: S_ADMIN_LOGIN_SUCCESS,
        payload: { email },
    };
};

export const sAdminLoginFailure = (error) => {
    return {
        type: S_ADMIN_LOGIN_FAILURE,
        payload: { error },
    };
};

export const sAdminLogout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem("superAdminToken");
    return { type: S_ADMIN_LOGOUT };
};

export const sAdminLogin = (email, password) => {
    //can return a pure or impure function, no restrictions and it receieves dispatch as an argument
    return function(dispatch) {
        dispatch(sAdminLoginRequest(email));

        const data = {
            email,
            password,
        };

        sAdminAuthApi
            .sAdminLogin(data)
            .then((response) => {
                // console.log("success response is", response);
                const token = JSON.stringify(response.data.token);

                window.localStorage.setItem("superAdminToken", token);
                dispatch(sAdminLoginSuccess(email));
                dispatch(sAdminApiLoadSuccess());
            })
            .catch((error) => {
                // console.log("error is", error.response);
                dispatch(sAdminLoginFailure(error));
            });
    };
};