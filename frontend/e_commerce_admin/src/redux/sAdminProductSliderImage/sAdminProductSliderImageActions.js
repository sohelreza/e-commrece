import {
    S_ADMIN_PRODUCT_SLIDER_IMAGE_CHANGE_TAB,
    S_ADMIN_PRODUCT_SLIDER_IMAGE_ID_SET,
    S_ADMIN_PRODUCT_SLIDER_IMAGE_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductSliderImageTypes";

export const sAdminProductSliderImageChangeTab = (tabName) => {
    return {
        type: S_ADMIN_PRODUCT_SLIDER_IMAGE_CHANGE_TAB,
        payload: { tabName },
    };
};

export const sAdminProductSliderImageIdSet = (id) => {
    return {
        type: S_ADMIN_PRODUCT_SLIDER_IMAGE_ID_SET,
        payload: { id },
    };
};

export const sAdminProductSliderImageListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_PRODUCT_SLIDER_IMAGE_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};