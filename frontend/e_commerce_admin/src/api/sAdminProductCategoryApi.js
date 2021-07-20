import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminProductCategoryApi = {
    sAdminGetProductCategoryList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_PRODUCT_CATEGORY_LIST,
            token
        );
    },

    sAdminGetProductCategoryDetails(productCategoryId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_PRODUCT_CATEGORY_DETAILS +
            productCategoryId,
            token
        );
    },

    sAdminAddProductCategory(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_PRODUCT_CATEGORY,
            data,
            token
        );
    },

    sAdminUpdateProductCategoryDetails(productCategoryId, data, token) {
        return axios.put(
            commonApi.api +
            apiList.S_ADMIN_UPDATE_PRODUCT_CATEGORY_DETAILS +
            productCategoryId,
            data,
            token
        );
    },
};