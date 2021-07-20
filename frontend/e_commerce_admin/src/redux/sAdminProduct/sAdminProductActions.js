import {
    S_ADMIN_PRODUCT_CHANGE_TAB,
    S_ADMIN_PRODUCT_ID_SET,
    S_ADMIN_PRODUCT_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductTypes";

export const sAdminProductChangeTab = (tabName) => {
    return {
        type: S_ADMIN_PRODUCT_CHANGE_TAB,
        payload: { tabName },
    };
};

export const sAdminProductIdSet = (id) => {
    return {
        type: S_ADMIN_PRODUCT_ID_SET,
        payload: { id },
    };
};

export const sAdminProductListSetScrollPosition = (positionX, positionY) => {
    return {
        type: S_ADMIN_PRODUCT_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};