import axios from "axios";

export const getProduct = async (id: string | undefined) => {
  const response = await axios.get(`/api/products/${id}`);
  return response.data;
};
