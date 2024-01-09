/* eslint-disable @typescript-eslint/no-explicit-any */
export const formDataParser = (data: any) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

export const getFormData = (data: any) => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};
