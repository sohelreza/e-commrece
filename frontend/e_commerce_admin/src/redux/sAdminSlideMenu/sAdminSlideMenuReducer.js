import { S_ADMIN_TOGGLE_MENU } from "./sAdminSlideMenuTypes";

const initialState = { isMenuOpen: true };

const sAdminSlideMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case S_ADMIN_TOGGLE_MENU:
            return {
                ...state,
                isMenuOpen: !state.isMenuOpen,
            };
        default:
            return state;
    }
};

export default sAdminSlideMenuReducer;