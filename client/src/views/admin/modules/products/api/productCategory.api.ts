/* eslint-disable @typescript-eslint/no-explicit-any */
import apiUtils from "@/utils/api.utils";
import { ProductCategory } from "../product";

const base = "products-category";

export default {
  create: async (payload: ProductCategory) => {
    try {
      return await apiUtils.privateAxios().post(`/${base}/create`, payload);
    } catch (e) {
      console.log(e);
      return e;
    }
  },

  fetchAll: async () => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  fetchById: async (UID: string) =>
    await apiUtils.privateAxios().get(`/${base}/${UID}`),

  updateById: async (UID: string, payload: any) =>
    await apiUtils
      .privateAxios({ isFile: true })
      .put(`${base}/${UID}`, payload),

  deleteById: async (id: string) => {
    const currentId = JSON.parse(localStorage.getItem("info") || "");
    if (id === currentId) {
      throw new Error("You cant Perform this Action");
    }

    return await apiUtils.privateAxios().delete(`/${base}/${id}`);
  },

  deleteByBatch: async (batchID: Array<string>) => {
    return await apiUtils.privateAxios().post(`/${base}/batch`, {
      payload: batchID,
    });
  },
};
