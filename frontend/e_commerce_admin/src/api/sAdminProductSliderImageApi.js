import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminProductSliderImageApi = {
    sAdminGetProductSliderImageList(token) {
        return axios.get(
            commonApi.api + apiList.S_ADMIN_GET_PRODUCT_SLIDER_IMAGE_LIST,
            token
        );
    },

    sAdminGetProductSliderImageDetails(productSliderImageId, token) {
        return axios.get(
            commonApi.api +
            apiList.S_ADMIN_GET_PRODUCT_SLIDER_IMAGE_DETAILS +
            productSliderImageId,
            token
        );
    },

    sAdminAddProductSliderImage(data, token) {
        return axios.post(
            commonApi.api + apiList.S_ADMIN_ADD_PRODUCT_SLIDER_IMAGE,
            data,
            token
        );
    },

    sAdminUpdateProductSliderImageDetails(productSliderImageId, data, token) {
        return axios.put(
            commonApi.api +
            apiList.S_ADMIN_UPDATE_PRODUCT_SLIDER_IMAGE_DETAILS +
            productSliderImageId,
            data,
            token
        );
    },

    sAdminDeleteProductSliderImage(productSliderImageId, token) {
        return axios.delete(
            commonApi.api +
            apiList.S_ADMIN_ADD_PRODUCT_SLIDER_IMAGE +
            productSliderImageId,
            token
        );
    },
};