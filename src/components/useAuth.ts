import { getJwtToken } from "../common/common";

export const useAuth = () => {
    if (!getJwtToken()) {
        return false;
    } else {
        return true;
    }
}