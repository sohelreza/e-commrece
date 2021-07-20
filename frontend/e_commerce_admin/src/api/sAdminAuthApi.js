import axios from "axios";

import commonApi from "./commonApi";
import { apiList } from "./apiList";

export const sAdminAuthApi = {
    sAdminLogin(data) {
        return axios.post(commonApi.api + apiList.S_ADMIN_LOG_IN, data);
    },
};