import {
    S_ADMIN_PRODUCT_CHANGE_TAB,
    S_ADMIN_PRODUCT_ID_SET,
    S_ADMIN_PRODUCT_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductTypes";

const initialState = {
    selectedTab: "Product List",
    productId: null,
    productListPositionX: 0,
    productListPositionY: 0,
};

const sAdminProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_PRODUCT_CHANGE_TAB:
            return {
                ...state,
                selectedTab: action.payload.tabName,
            };

        case S_ADMIN_PRODUCT_ID_SET:
            return {
                ...state,
                productId: action.payload.id,
            };

        case S_ADMIN_PRODUCT_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                productListPositionX: action.payload.positionX,
                productListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminProductReducer;