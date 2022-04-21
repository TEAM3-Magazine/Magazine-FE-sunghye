import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../service/apis/userApi";

const Userapi = new UserApi();

const initialState = {
  user_info: {
    username: null,
    userid: null,
  },
  is_login: false,
};
