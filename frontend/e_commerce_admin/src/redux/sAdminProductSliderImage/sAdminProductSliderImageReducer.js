import {
    S_ADMIN_PRODUCT_SLIDER_IMAGE_CHANGE_TAB,
    S_ADMIN_PRODUCT_SLIDER_IMAGE_ID_SET,
    S_ADMIN_PRODUCT_SLIDER_IMAGE_LIST_SET_SCROLL_POSITION,
} from "./sAdminProductSliderImageTypes";

const initialState = {
    selectedTab: "Slider Image List",
    productSliderImageId: null,
    productSliderImageListPositionX: 0,
    productSliderImageListPositionY: 0,
};

const sAdminProductSliderImageReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_PRODUCT_SLIDER_IMAGE_CHANGE_TAB:
            return {
                ...state,
                selectedTab: action.payload.tabName,
            };

        case S_ADMIN_PRODUCT_SLIDER_IMAGE_ID_SET:
            return {
                ...state,
                productSliderImageId: action.payload.id,
            };

        case S_ADMIN_PRODUCT_SLIDER_IMAGE_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                productSliderImageListPositionX: action.payload.positionX,
                productSliderImageListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminProductSliderImageReducer;