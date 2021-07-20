import { combineReducers } from "redux";

import sAdminDietRequestReducer from "./sAdminDietRequest/sAdminDietRequestReducer";
import sAdminLoginReducer from "./sAdminLogin/sAdminLoginReducer";
import sAdminProductReducer from "./sAdminProduct/sAdminProductReducer";
import sAdminProductBrandReducer from "./sAdminProductBrand/sAdminProductBrandReducer";
import sAdminProductCategoryReducer from "./sAdminProductCategory/sAdminProductCategoryReducer";
import sAdminProductSliderImageReducer from "./sAdminProductSliderImage/sAdminProductSliderImageReducer";
import sAdminProductSubcategoryReducer from "./sAdminProductSubcategory/sAdminProductSubcategoryReducer";
import sAdminSlideMenuReducer from "./sAdminSlideMenu/sAdminSlideMenuReducer";

const rootReducer = combineReducers({
    sAdminDietRequestReducer,
    sAdminLoginReducer,
    sAdminProductReducer,
    sAdminProductBrandReducer,
    sAdminProductCategoryReducer,
    sAdminProductSliderImageReducer,
    sAdminProductSubcategoryReducer,
    sAdminSlideMenuReducer,
});

export default rootReducer;