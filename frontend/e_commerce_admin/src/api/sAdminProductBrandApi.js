import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminProductBrandApi = {
    sAdminGetProductBrandList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_PRODUCT_BRAND_LIST,
            token
        );
    },

    sAdminGetProductBrandDetails(productBrandId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_PRODUCT_BRAND_DETAILS +
            productBrandId,
            token
        );
    },

    sAdminAddProductBrand(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_PRODUCT_BRAND,
            data,
            token
        );
    },

    sAdminUpdateProductBrandDetails(productBrandId, data, token) {
        return axios.put(
            commonApi.api +
            apiList.S_ADMIN_UPDATE_PRODUCT_BRAND_DETAILS +
            productBrandId,
            data,
            token
        );
    },
};