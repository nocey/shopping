import { Callback } from "../api";

export interface IProduct {
  createdAt: string;
  name: string;
  image: string;
  price: string;
  description: string;
  model: string;
  brand: string;
  id: string;
}

export type GetProduct<T> = (callback: Callback<T>, id: string) => void;
