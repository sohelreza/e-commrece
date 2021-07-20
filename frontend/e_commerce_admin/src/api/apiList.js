const sAdminCommonApi = "api/admin/";

// list of api s from backend to perform server side action
export const apiList = {
    S_ADMIN_LOG_IN: sAdminCommonApi + "login",

    S_ADMIN_GET_PRODUCT_CATEGORY_LIST: sAdminCommonApi + "categories",
    S_ADMIN_ADD_PRODUCT_CATEGORY: sAdminCommonApi + "categories",
    S_ADMIN_GET_PRODUCT_CATEGORY_DETAILS: sAdminCommonApi + "categories/", // add productCategoryId in the end
    S_ADMIN_UPDATE_PRODUCT_CATEGORY_DETAILS: sAdminCommonApi + "categories/", // add productCategoryId in the end

    S_ADMIN_GET_PRODUCT_SUBCATEGORY_LIST: sAdminCommonApi + "subcategories",
    S_ADMIN_ADD_PRODUCT_SUBCATEGORY: sAdminCommonApi + "subcategories",
    S_ADMIN_GET_PRODUCT_SUBCATEGORY_DETAILS: sAdminCommonApi + "subcategories/", // add productSubcategoryId in the end
    S_ADMIN_UPDATE_PRODUCT_SUBCATEGORY_DETAILS: sAdminCommonApi + "subcategories/", // add productSubcategoryId in the end

    S_ADMIN_GET_PRODUCT_BRAND_LIST: sAdminCommonApi + "brands",
    S_ADMIN_ADD_PRODUCT_BRAND: sAdminCommonApi + "brands",
    S_ADMIN_GET_PRODUCT_BRAND_DETAILS: sAdminCommonApi + "brands/", // add productBrandId in the end
    S_ADMIN_UPDATE_PRODUCT_BRAND_DETAILS: sAdminCommonApi + "brands/", // add productBrandId in the end

    S_ADMIN_GET_PRODUCT_LIST: sAdminCommonApi + "products",
    S_ADMIN_ADD_PRODUCT: sAdminCommonApi + "products",
    S_ADMIN_GET_PRODUCT_DETAILS: sAdminCommonApi + "products/", // add productId in the end
    S_ADMIN_UPDATE_PRODUCT_DETAILS: sAdminCommonApi + "products/", // add productId in the end
    S_ADMIN_GET_SPECIFIC_SUBCATEGORY: sAdminCommonApi + "getSubcategories/", // add categoryId in the end

    S_ADMIN_GET_PRODUCT_SLIDER_IMAGE_LIST: sAdminCommonApi + "sliders",
    S_ADMIN_ADD_PRODUCT_SLIDER_IMAGE: sAdminCommonApi + "sliders",
    S_ADMIN_GET_PRODUCT_SLIDER_IMAGE_DETAILS: sAdminCommonApi + "sliders/", // add productSliderImageId in the end
    S_ADMIN_UPDATE_PRODUCT_SLIDER_IMAGE_DETAILS: sAdminCommonApi + "sliders/", // add productSliderImageId in the end
    S_ADMIN_DELETE_PRODUCT_SLIDER_IMAGE: sAdminCommonApi + "sliders/", // add productSliderImageId in the end
};