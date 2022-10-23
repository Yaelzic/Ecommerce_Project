import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signin, signUp, logOut } from "./loginAPI";
import jwt_decode from "jwt-decode";

// State - data (init)
const initialState = {
  userName: (JSON.parse(localStorage.getItem("token"))) 
  ? (JSON.parse(localStorage.getItem("token"))).user : (""),
  email: "",
  token: (JSON.parse(localStorage.getItem("token"))) 
  ? (JSON.parse(localStorage.getItem("token"))).token : (""),
  logged: false,
  admin: (JSON.parse(localStorage.getItem("token"))) 
  ? (JSON.parse(localStorage.getItem("token"))).token : (false)
};

export const doSigninAsync = createAsyncThunk("login/signin", async (xyz) => {
  const response = await signin(xyz);
  return response.data;
});

export const doSignupAsync = createAsyncThunk("login/signUp", async (cred) => {
  const response = await signUp(cred);
  return response.data;
});

export const doSignOutAsync = createAsyncThunk(
  'login/logOut',
  async (token) => {
      const response = await logOut(token);
      return response.data;
  }
);




export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.token =""
      state.logged = false;
      state.userName= ""
      state.email=""
      state.admin = false
      localStorage.removeItem("token");
    },
  },
 
  extraReducers: (builder) => {
    builder
      .addCase(doSigninAsync.fulfilled, (state, action) => {
        if (action.payload.access) {
          state.token = action.payload.access;
          state.logged = true;
          state.userName = jwt_decode(action.payload.access).username;
          state.email = jwt_decode(action.payload.access).email;
          state.admin = jwt_decode(action.payload.access).admin;
          localStorage.setItem("token", JSON.stringify({token:state.token, user:state.userName, isAdmin:state.admin}));
        }
      })
      .addCase(doSignupAsync.fulfilled, (state, action) => {
        if (action.payload.access) {
          // state.token = action.payload.access
          // state.logged = true;
          // state.userName= jwt_decode(action.payload.access).username
          // state.email=jwt_decode(action.payload.access).eeemail
          // console.log( state.email)
        }
      }).addCase(doSignOutAsync.fulfilled, (state, action) => {
            state.token =""
            state.logged = false;
            state.userName= ""
            state.email=""
            state.admin = false
            localStorage.removeItem("token");
    });
  },
});



export const { logout } = loginSlice.actions;
export const selectLogged = (state) => state.login.logged;
export const selectEmail = (state) => state.login.email;
export const selectUserName = (state) => state.login.userName;
export const selectToken = (state) => state.login.token;
export const selectAdmin = (state) => state.login.admin;
export default loginSlice.reducer;
