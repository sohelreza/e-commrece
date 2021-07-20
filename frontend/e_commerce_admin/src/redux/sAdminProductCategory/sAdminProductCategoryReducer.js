import {
    S_ADMIN_PRODUCT_CATEGORY_CHANGE_TAB,
    S_ADMIN_PRODUCT_CATEGORY_ID_SET,
    S_ADMIN_PRODUCT_CATEGORY_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductCategoryTypes";

const initialState = {
    selectedTab: "Category List",
    productCategoryId: null,
    productCategoryListPositionX: 0,
    productCategoryListPositionY: 0,
};

const sAdminProductCategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_PRODUCT_CATEGORY_CHANGE_TAB:
            return {
                ...state,
                selectedTab: action.payload.tabName,
            };

        case S_ADMIN_PRODUCT_CATEGORY_ID_SET:
            return {
                ...state,
                productCategoryId: action.payload.id,
            };

        case S_ADMIN_PRODUCT_CATEGORY_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                productCategoryListPositionX: action.payload.positionX,
                productCategoryListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminProductCategoryReducer;