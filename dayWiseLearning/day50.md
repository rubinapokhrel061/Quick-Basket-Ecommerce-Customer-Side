<!-- day50 complte register and login api integration with standard way and connect frontend backend complete form submition register and login -->
<!-- global/types/types.ts -->

export enum Status {
SUCCESS = "success",
LOADING = "loading",
ERROR = "error",
}

<!-- http/index.ts -->

import axios from "axios";

const API = axios.create({
baseURL: "http://localhost:8080/",
headers: {
"Content-Type": "application/json",
Accept: "application/json",
},
});
export { API };

<!-- authslice -->

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { API } from "../http";
import { Status } from "../globals/types/types";
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
} else {
dispatch(setStatus(Status.ERROR));
}
} catch (error) {
dispatch(setStatus(Status.ERROR));
}
};
}
export function login(data: LoginData) {
return async function loginThunk(dispatch: any) {
dispatch(setStatus(Status.LOADING));
try {
const response = await API.post("login ", data);
if (response.status === 200) {
const { data } = response.data;
dispatch(setStatus(Status.SUCCESS));
dispatch(setToken(data));
localStorage.setItem("token", data);
} else {
dispatch(setStatus(Status.ERROR));
}
} catch (error) {
dispatch(setStatus(Status.ERROR));
}
};
}

<!-- pages/auth/form.ts -->

import { Link } from "react-router-dom";
import { Props, UserDataType } from "./type";
import { useState } from "react";

const Form: React.FC<Props> = ({ type, onSubmit }) => {
const [userData, setUserData] = useState<UserDataType>({
email: "",
username: "",
password: "",
});

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
const { name, value } = e.target;
setUserData({
...userData,
[name]: value,
});
};
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
onSubmit(userData);
};
return (
<>
{/_ Page Container _/}
<div
        id="page-container"
        className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
      >
{/_ Page Content _/}
<main id="page-content" className="flex max-w-full flex-auto flex-col">
<div className="relative mx-auto flex min-h-dvh w-full max-w-10xl items-center justify-center overflow-hidden p-4 lg:p-8">
{/_ Sign In Section _/}
<section className="w-full max-w-xl py-6">
{/_ Header _/}
<header className="mb-10 text-center">
<h1 className="mb-2 inline-flex items-center gap-2 text-2xl font-bold">

                  <span>Company</span>
                </h1>
                <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Welcome, please {type === "register" ? "Sign  Up" : "Sign In"}
                  to your dashboard
                </h2>
              </header>

              <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:text-gray-100">
                <div className="grow p-5 md:px-16 md:py-12">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        onChange={handleChange}
                        name="email"
                        placeholder="Enter your email"

                      />
                    </div>
                    {type === "register" && (
                      <>
                        <div className="space-y-1">
                          <label
                            htmlFor="username"
                            className="text-sm font-medium"
                          >
                            username
                          </label>
                          <input
                            type="username"
                            id="username"
                            onChange={handleChange}
                            name="username"
                            placeholder="Enter your username"

                          />
                        </div>
                      </>
                    )}
                    <div className="space-y-1">
                      <label htmlFor="password" className="text-sm font-medium">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        onChange={handleChange}
                        name="password"
                        placeholder="Enter your password"

                      />
                    </div>
                    <div>
                      <div className="mb-5 flex items-center justify-between gap-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            id="remember_me"
                            name="remember_me"

                          />
                          <span className="ml-2 text-sm">Remember me</span>
                        </label>
                        <a
                          href="#"
                          className="inline-block text-sm font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          Forgot Password?
                        </a>
                      </div>
                      <button
                        type="submit"

                      >
                        <svg
                          className="hi-mini hi-arrow-uturn-right inline-block size-5 opacity-50"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>
                          {" "}
                          {type === "register" ? "Sign  Up" : "Sign In"}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
                {type === "register" ? (
                  <div className="grow bg-gray-50 p-5 text-center text-sm dark:bg-gray-700/50 md:px-16">
                    Already have an account ?
                    <Link
                      to="/login"
                      className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign In
                    </Link>
                  </div>
                ) : (
                  <div className="grow bg-gray-50 p-5 text-center text-sm dark:bg-gray-700/50 md:px-16">
                    Don’t have an account yet?
                    <Link
                      to="/register"
                      className="font-medium text-blue-600 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>

);
};

export default Form;

<!-- pages/auth/Register/Register.ts -->

import Form from "../Form";
import { UserDataType } from "../type";
import { register, resetStatus } from "../../../store/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useEffect } from "react";
import { Status } from "../../../globals/types/types";
import { useNavigate } from "react-router-dom";

const Register = () => {
const navigate = useNavigate();
const { status } = useAppSelector((state) => state.auth);
const dispatch = useAppDispatch();
const handleRegister = async (data: UserDataType) => {
dispatch(register(data));
// const response = await axios.post("http://localhost:8080/register", data);
};
useEffect(() => {
if (status === Status.SUCCESS) {
dispatch(resetStatus());
navigate("/login");
}
}, [status, navigate, dispatch]);
return (
<>
<Form type="register" onSubmit={handleRegister} />
</>
);
};

export default Register;

<!-- pages/auth/login/Login.ts -->

import { useNavigate } from "react-router-dom";
import Form from "../Form";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { UserLoginType } from "../type";
import { login, resetStatus } from "../../../store/authSlice";
import { useEffect } from "react";
import { Status } from "../../../globals/types/types";

const Login = () => {
const navigate = useNavigate();
const { status } = useAppSelector((state) => state.auth);
const dispatch = useAppDispatch();
const handleLogin = async (data: UserLoginType) => {
console.log(data);
dispatch(login(data));
// const response = await axios.post("http://localhost:8080/register", data);
};
useEffect(() => {
if (status === Status.SUCCESS) {
dispatch(resetStatus());
navigate("/");
}
}, [status, navigate, dispatch]);
return (
<>
<Form type="login" onSubmit={handleLogin} />
</>
);
};

export default Login;
