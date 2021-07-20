import { S_ADMIN_DIET_REQUEST_LIST_SET_SCROLL_POSITION } from "./sAdminDietRequestTypes";

export const sAdminDietRequestListSetScrollPosition = (
    positionX,
    positionY
) => {
    return {
        type: S_ADMIN_DIET_REQUEST_LIST_SET_SCROLL_POSITION,
        payload: { positionX, positionY },
    };
};