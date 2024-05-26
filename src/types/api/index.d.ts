import { HttpStatusCode } from "axios";

export type Callback<T> = (data: T, status: HttpStatusCode) => void;
