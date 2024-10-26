<!-- learn about Asychronous function in redux toolkit -->

<!-- authSlice -->

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
username: string;
email: string;
password: string;
token: string;
}

interface AuthState {
user: User;
status: string;
}

const initialState: AuthState = {
user: {} as User,
status: "LOADING",
};

const authSlice = createSlice({
name: "auth",
initialState,
reducers: {
setUser(state: AuthState, action: PayloadAction<User>) {
state.user = action.payload;
},
setStatus(state: AuthState, action: PayloadAction<string>) {
state.status = action.payload;
},
resetStatus(state: AuthState) {
state.status ="LOADING;"
},
setToken(state: AuthState, action: PayloadAction<string>) {
state.user.token = action.payload;
},
},
});

export const { setUser, setStatus, resetStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

<!-- store.ts -->

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
reducer: {
auth: authSlice,

},
});

export default store;

<!-- day49 -->
<!-- Register and login api integration like this -->

export function register(data:RegisterData){
return async function registerThunk(dispatch:any){
dispatch(setStatus('loading'))
try {
const response = await axios.post('http://localhost:3000/register',data)
if(response.status === 201){
dispatch(setStatus('success'))
}else{
dispatch(setStatus('error'))
}
} catch (error) {
dispatch(setStatus('error'))
}
}
}
export function login(data:LoginData){
return async function loginThunk(dispatch:any){
dispatch(setStatus('loading'))
try {
const response = await axios.post('http://localhost:3000/register',data)
if(response.status === 200){
dispatch(setStatus('success'))
}else{
dispatch(setStatus('error'))
}
} catch (error) {
dispatch(setStatus('error'))
}
}
}
