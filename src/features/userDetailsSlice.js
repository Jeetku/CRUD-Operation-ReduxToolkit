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

// Read action

export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(
      "https://64f46ed8932537f4051a5ada.mockapi.io/crud"
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Delete Action

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://64f46ed8932537f4051a5ada.mockapi.io/crud/${id}`,
      { method: "DELETE" }
    );

    try {
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Update Action
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("updated Data", data);
    const response = await fetch(
      `https://64f46ed8932537f4051a5ada.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
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
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
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
      state.user = [];
      state.error = action.error.message;
    },
    [showUser.pending]: (state) => {
      state.loading = true;
    },
    [showUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = "";
    },
    [showUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.user = state.user.filter((item) => item.id !== id);
      }
      // console.log("deleteUser", action.payload);
      state.error = "";
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = state.user.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
      state.error = "";
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.user = [];
      state.error = action.error.message;
    },
  },
});

export default userDetails.reducer;
export const { searchUser } = userDetails.actions;
