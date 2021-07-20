import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminProductSubcategoryApi = {
    sAdminGetProductSubcategoryList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_PRODUCT_SUBCATEGORY_LIST,
            token
        );
    },

    sAdminGetProductSubcategoryDetails(productSubcategoryId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_PRODUCT_SUBCATEGORY_DETAILS +
            productSubcategoryId,
            token
        );
    },

    sAdminAddProductSubcategory(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_PRODUCT_SUBCATEGORY,
            data,
            token
        );
    },

    sAdminUpdateProductSubcategoryDetails(productSubcategoryId, data, token) {
        return axios.put(
            commonApi.api +
            apiList.S_ADMIN_UPDATE_PRODUCT_SUBCATEGORY_DETAILS +
            productSubcategoryId,
            data,
            token
        );
    },
};