import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { API } from "../http";
import { Status } from "../globals/types/types";
import toast from "react-hot-toast";
interface User {
  username: string;
  email: string;
  password: string;
  token: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthState {
  user: User;
  status: Status;
}

const initialState: AuthState = {
  user: {} as User,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state: AuthState, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setStatus(state: AuthState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    resetStatus(state: AuthState) {
      state.status = Status.LOADING;
    },
    setToken(state: AuthState, action: PayloadAction<string>) {
      state.user.token = action.payload;
    },
  },
});

export const { setUser, setStatus, resetStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

export function register(data: RegisterData) {
  return async function registerThunk(dispatch: any) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("register ", data);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        toast.success(response.data.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}
export function login(data: LoginData) {
  return async function loginThunk(dispatch: any) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await API.post("login ", data);
      if (response.status === 200) {
        const token = response.data.data;
        const user = response.data.user;
        console.log(user);
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setToken(token));
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);

        toast.success(response.data.message);
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      dispatch(setStatus(Status.ERROR));
      toast.error(error.response.data.message);
    }
  };
}
