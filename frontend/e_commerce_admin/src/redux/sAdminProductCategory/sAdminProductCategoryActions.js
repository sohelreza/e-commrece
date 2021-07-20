import {
    S_ADMIN_PRODUCT_CATEGORY_CHANGE_TAB,
    S_ADMIN_PRODUCT_CATEGORY_ID_SET,
    S_ADMIN_PRODUCT_CATEGORY_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductCategoryTypes";

export const sAdminProductCategoryChangeTab = (tabName) => {
    return {
        type: S_ADMIN_PRODUCT_CATEGORY_CHANGE_TAB,
        payload: { tabName },
    };
};

export const sAdminProductCategoryIdSet = (id) => {
    return {
        type: S_ADMIN_PRODUCT_CATEGORY_ID_SET,
        payload: { id },
    };
};

export const sAdminProductCategoryListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_PRODUCT_CATEGORY_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};