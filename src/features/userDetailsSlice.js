import { createSlice } from "@reduxjs/toolkit";

export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    user: [],
    loading: false,
    error: "",
  },
});

export default userDetails.reducer;
