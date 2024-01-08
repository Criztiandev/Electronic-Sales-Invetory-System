import apiUtils from "@/utils/api.utils";

const BASE_IMG = import.meta.env.VITE_BASE_IMAGE_URL;

export default {
  fetchImage: async (path: string) => {
    try {
      const res = await apiUtils.imageAxios().get(`${BASE_IMG}/${path}`);
      const payload = res.data;

      // convert binary to data ulr
      const blob = new Blob([payload], { type: "image/*" });
      const dataURL = URL.createObjectURL(blob);
      return dataURL;
    } catch (e) {
      return e;
    }
  },
};
