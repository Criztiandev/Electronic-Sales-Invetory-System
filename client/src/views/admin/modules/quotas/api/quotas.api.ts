/* eslint-disable @typescript-eslint/no-explicit-any */
import apiUtils from "@/utils/api.utils";
import { Quotas } from "../quotas";

const base = "quotas";

export default {
  create: async (payload: Quotas) => {
    try {
      console.log("payload", payload);
      const res = await apiUtils
        .privateAxios()
        .post(`/${base}/create`, payload);

      console.log("res", res);
      return res.data;
    } catch (e) {
      console.log("e", e);
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

  fetchById: async (UID: string) => {
    try {
      const res = await apiUtils.privateAxios().get(`/${base}/${UID}`);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  updateById: async (UID: string, payload: any) => {
    try {
      const res = await apiUtils.privateAxios().put(`${base}/${UID}`, payload);
      return res.data;
    } catch (e) {
      return e;
    }
  },

  deleteById: async (id: string) => {
    try {
      const currentId = JSON.parse(localStorage.getItem("info") || "");
      if (id === currentId) {
        throw new Error("You cant Perform this Action");
      }
      return await apiUtils.privateAxios().delete(`/${base}/${id}`);
    } catch (e) {
      return e;
    }
  },

  deleteByBatch: async (batchID: Array<string>) => {
    try {
      return await apiUtils.privateAxios().post(`/${base}/batch`, {
        payload: batchID,
      });
    } catch (e) {
      return e;
    }
  },
};
