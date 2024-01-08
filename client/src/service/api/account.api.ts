import { User } from "@/interface/user";
import apiUtils from "@/utils/api.utils";

const BASE_URL: string = import.meta.env.VITE_BASE_URL;

export default {
  getUserDetails: async (UID: string) => {
    try {
      const res = await apiUtils
        .privateAxios()
        .get(`${BASE_URL}/account/${UID}`);

      return res.data;
    } catch (e) {
      return e;
    }
  },

  updateDetailsById: async (UID: string, payload: User) =>
    await apiUtils
      .privateAxios({ isFile: true })
      .put(`${BASE_URL}/account/${UID}`, payload),

  deleteDetailsById: async (UID: string) =>
    await apiUtils.privateAxios().delete(`${BASE_URL}/account/${UID}`),
};
