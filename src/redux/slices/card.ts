import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IProducts } from "@/types/products";

export type Card = IProducts;

type ShoppingCard = {
  [key: string]: Card;
};

const shoppingCard = localStorage.getItem("ShoppingCard");
// Define the initial state using that type
const initialState: ShoppingCard = shoppingCard ? JSON.parse(shoppingCard) : {};

export const cardSlice = createSlice({
  name: "card",
  initialState: initialState as ShoppingCard,
  reducers: {
    CardSet: (state, action: PayloadAction<ShoppingCard>) => {
      state = { ...action.payload };
      localStorage.setItem("ShoppingCard", JSON.stringify(state));
      return state;
    },
  },
});

export const { CardSet } = cardSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (state: RootState): ShoppingCard => state.card;

export default cardSlice.reducer;
