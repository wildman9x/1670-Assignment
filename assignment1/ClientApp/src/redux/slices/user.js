import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  role: null,
  loading: false,
};

export const login = createAsyncThunk("user/login", async (user) => {
  const response = await fetch("/api/User/Login", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.json();
});

export const register = createAsyncThunk(
  "user/register",
  async ({ user, admin }) => {
    const response = await fetch("/api/User/CreateUser", {
      method: "POST",
      headers: {
        Accept: "*/*",
      },
      body: JSON.stringify({ ...user, role: admin ? "Admin" : "User" }),
    });
    console.log(response);

    const data = await response.json();
    console.log(data);
    return data;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  const response = await fetch("/api/User/Logout", {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
  });
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.email = null;
      state.role = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.email = action.meta.arg.email;
      state.role = action.payload?.pop();
      state.loading = false;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addMatcher(
      isAnyOf(login.pending, register.pending, logout.pending),
      (state) => {
        state.loading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(login.rejected, register.rejected, logout.rejected),
      (state, action) => {
        state.loading = false;
        console.warn(action.type, action.error);
      }
    );
  },
});

export const { updateHideBalance } = userSlice.actions;

export default userSlice.reducer;
