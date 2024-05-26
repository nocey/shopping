import { axiosInit } from "..";
import { GetProduct, IProduct } from "@/types/products/detail";

const URL_PREFIX = "products";

export const getProduct: GetProduct<IProduct> = async (callback, id) => {
  try {
    const response = await axiosInit().get<IProduct>(URL_PREFIX + `/${id}`);
    callback(response.data, response?.status);
  } catch (e: unknown) {
    callback(e as IProduct, 400);
  }
};
