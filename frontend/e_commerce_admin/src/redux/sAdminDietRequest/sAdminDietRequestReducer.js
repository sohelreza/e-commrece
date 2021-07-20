import { S_ADMIN_DIET_REQUEST_LIST_SET_SCROLL_POSITION } from "./sAdminDietRequestTypes";

const initialState = {
    dietRequestListPositionX: 0,
    dietRequestListPositionY: 0,
};

const sAdminDietRequestReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_DIET_REQUEST_LIST_SET_SCROLL_POSITION:
            return {
                ...state,
                dietRequestListPositionX: action.payload.positionX,
                dietRequestListPositionY: action.payload.positionY,
            };

        default:
            return state;
    }
};

export default sAdminDietRequestReducer;