import {
    S_ADMIN_PRODUCT_SUBCATEGORY_CHANGE_TAB,
    S_ADMIN_PRODUCT_SUBCATEGORY_ID_SET,
    S_ADMIN_PRODUCT_SUBCATEGORY_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductSubcategoryTypes";

export const sAdminProductSubcategoryChangeTab = (tabName) => {
    return {
        type: S_ADMIN_PRODUCT_SUBCATEGORY_CHANGE_TAB,
        payload: { tabName },
    };
};

export const sAdminProductSubcategoryIdSet = (id) => {
    return {
        type: S_ADMIN_PRODUCT_SUBCATEGORY_ID_SET,
        payload: { id },
    };
};

export const sAdminProductSubcategoryListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_PRODUCT_SUBCATEGORY_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};