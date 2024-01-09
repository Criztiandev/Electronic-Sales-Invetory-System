/* eslint-disable @typescript-eslint/no-explicit-any */
import apiUtils from "@/utils/api.utils";
import categoryConfig from "@/views/admin/config/tables/category.config";
import { Products } from "@/views/admin/interface/model";

const { base } = categoryConfig.productTable;

export default {
  create: async (payload: Products) =>
    await apiUtils
      .privateAxios({ isFile: true })
      .post(`/${base}/create`, payload),

  fetchAll: async () =>
    await apiUtils.privateAxios().get(`/${base}?size=10&index=0`),

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
