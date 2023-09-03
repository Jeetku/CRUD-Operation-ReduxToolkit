import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Create Actions

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://64f46ed8932537f4051a5ada.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userDetails = createSlice({
  name: "userDetails",
  initialState: {
    user: [],
    loading: false,
    error: "",
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user.push(action.payload);
      state.error = "";
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.payload.message;
    },
  },
});

export default userDetails.reducer;
