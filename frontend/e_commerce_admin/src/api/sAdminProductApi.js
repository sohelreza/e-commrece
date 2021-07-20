import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminProductApi = {
    sAdminGetProductList(token) {
        return axios.get(commonApi.api + apiList.S_ADMIN_GET_PRODUCT_LIST, token);
    },

    sAdminGetProductDetails(productId, token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_PRODUCT_DETAILS + productId,
            token
        );
    },

    sAdminAddProduct(data, token) {
        return axios.post(commonApi.api + apiList.S_ADMIN_ADD_PRODUCT, data, token);
    },

    sAdminUpdateProductDetails(productId, data, token) {
        return axios.put(
            commonApi.api + apiList.S_ADMIN_UPDATE_PRODUCT_DETAILS + productId,
            data,
            token
        );
    },

    sAdminGetSpecificSubcategories(categoryId, token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_SPECIFIC_SUBCATEGORY + categoryId,
            token
        );
    },
};