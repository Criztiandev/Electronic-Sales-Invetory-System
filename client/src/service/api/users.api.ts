/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/interface/user";
import apiUtils from "@/utils/api.utils";

const BASE_ROUTE = "users";
export default {
  createUser: async (payload: User) =>
    await apiUtils
      .privateAxios({ isFile: true })
      .post(`/${BASE_ROUTE}/create`, payload),

  fetchAllUser: async () =>
    await apiUtils.privateAxios().get(`/${BASE_ROUTE}?size=10&index=0`),

  fetchUserById: async (UID: string) => {
    try {
      const res = await apiUtils.privateAxios().get(`/${BASE_ROUTE}/${UID}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  updateUserById: async (UID: string, payload: any) =>
    await apiUtils
      .privateAxios({ isFile: true })
      .put(`${BASE_ROUTE}/${UID}`, payload),

  deleteUserById: async (id: string) => {
    const currentId = JSON.parse(localStorage.getItem("info") || "");
    if (id === currentId) {
      throw new Error("You cant Perform this Action");
    }
    return await apiUtils.privateAxios().delete(`/${BASE_ROUTE}/${id}`);
  },

  deleteUserByBatch: async (batchID: Array<string>) => {
    return await apiUtils.privateAxios().post(`/${BASE_ROUTE}/batch`, {
      payload: batchID,
    });
  },
};
