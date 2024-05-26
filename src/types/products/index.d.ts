import { Callback } from "../api";
import { IProduct } from "./detail";

export type GetProducts<T> = (callback: Callback<T>) => void;

export type IProducts = IProduct[];
