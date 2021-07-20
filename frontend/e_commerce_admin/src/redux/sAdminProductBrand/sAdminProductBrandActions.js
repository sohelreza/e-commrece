import {
    S_ADMIN_PRODUCT_BRAND_CHANGE_TAB,
    S_ADMIN_PRODUCT_BRAND_ID_SET,
    S_ADMIN_PRODUCT_BRAND_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductBrandTypes";

export const sAdminProductBrandChangeTab = (tabName) => {
    return {
        type: S_ADMIN_PRODUCT_BRAND_CHANGE_TAB,
        payload: { tabName },
    };
};

export const sAdminProductBrandIdSet = (id) => {
    return {
        type: S_ADMIN_PRODUCT_BRAND_ID_SET,
        payload: { id },
    };
};

export const sAdminProductBrandListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_PRODUCT_BRAND_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};