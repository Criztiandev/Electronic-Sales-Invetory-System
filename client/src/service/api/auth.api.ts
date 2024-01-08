import { User } from "@/interface/user";
import apiUtils from "@/utils/api.utils";
import { LoginData } from "@/views/auth/types/auth";

const BASE_ROUTE: string = "auth";
export default {
  login: async (payload: LoginData) =>
    await apiUtils.privateAxios().post(`/${BASE_ROUTE}`, payload),

  register: async (payload: User) =>
    await apiUtils.publicAxios().post(`/${BASE_ROUTE}/register`, payload),
};
