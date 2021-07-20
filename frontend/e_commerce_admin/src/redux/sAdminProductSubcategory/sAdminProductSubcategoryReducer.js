import {
    S_ADMIN_PRODUCT_SUBCATEGORY_CHANGE_TAB,
    S_ADMIN_PRODUCT_SUBCATEGORY_ID_SET,
    S_ADMIN_PRODUCT_SUBCATEGORY_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductSubcategoryTypes";

const initialState = {
    selectedTab: "Subcategory List",
    productSubcategoryId: null,
    productSubcategoryListPositionX: 0,
    productSubcategoryListPositionY: 0,
};

const sAdminProductSubcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_PRODUCT_SUBCATEGORY_CHANGE_TAB:
            return {
                ...state,
                selectedTab: action.payload.tabName,
            };

        case S_ADMIN_PRODUCT_SUBCATEGORY_ID_SET:
            return {
                ...state,
                productSubcategoryId: action.payload.id,
            };

        case S_ADMIN_PRODUCT_SUBCATEGORY_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                productSubcategoryListPositionX: action.payload.positionX,
                productSubcategoryListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminProductSubcategoryReducer;