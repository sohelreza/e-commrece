import {
    S_ADMIN_PRODUCT_BRAND_CHANGE_TAB,
    S_ADMIN_PRODUCT_BRAND_ID_SET,
    S_ADMIN_PRODUCT_BRAND_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductBrandTypes";

const initialState = {
    selectedTab: "Brand List",
    productBrandId: null,
    productBrandListPositionX: 0,
    productBrandListPositionY: 0,
};

const sAdminProductBrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_PRODUCT_BRAND_CHANGE_TAB:
            return {
                ...state,
                selectedTab: action.payload.tabName,
            };

        case S_ADMIN_PRODUCT_BRAND_ID_SET:
            return {
                ...state,
                productBrandId: action.payload.id,
            };

        case S_ADMIN_PRODUCT_BRAND_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                productBrandListPositionX: action.payload.positionX,
                productBrandListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminProductBrandReducer;