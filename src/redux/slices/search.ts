import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
// Define the initial state using that type
const initialState: string = "";

export const searchSlice = createSlice({
  name: "search",
  initialState: initialState as string,
  reducers: {
    SearchSet: (state, action: PayloadAction<string>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { SearchSet } = searchSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSearch = (state: RootState): string => state.search;

export default searchSlice.reducer;
