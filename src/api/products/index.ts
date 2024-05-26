import { GetProducts, IProducts } from "@/types/products";
import { axiosInit } from "..";

const URL_PREFIX = "products";

export const getProducts: GetProducts<IProducts> = async (callback) => {
  try {
    const response = await axiosInit().get<IProducts>(URL_PREFIX);
    callback(response.data, response?.status);
  } catch (e: unknown) {
    callback(e as IProducts, 400);
  }
};
