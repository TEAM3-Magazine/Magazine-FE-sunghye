import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UserApi from "../../service/apis/userApi";

const Userapi = new UserApi();

const initialState = {
  user_info: {
    user_name: null,
    user_id: null,
  },
  is_login: false,
};

// 회원가입
export const signUpAxios = createAsyncThunk(
  "user/signUpAxios",
  async ({ registerData, navigate }) => {
    const signUpResult = await Userapi.signUp({ registerData, navigate });
    return signUpResult;
  }
);

// 로그인
export const signInAxios = createAsyncThunk(
  "user/signInAxios",
  async ({ signInData, navigate }, { dispatch }) => {
    const userToken = await Userapi.signIn({ signInData, navigate });

    if (userToken) {
      dispatch(setUserToSession(userToken));
      dispatch(getUserAxios());
      return userToken;
    }
  }
);

// 로그인 체크
// export const setSignInFalse = createAsyncThunk("loginCheck", async () => {});

// 로그아웃
export const signOutAxios = createAsyncThunk(
  "user/signOutAxios",
  async ({ navigate }, { dispatch }) => {
    dispatch(deleteUserFromSession());
    navigate("/", { replace: true });
    return;
  }
);

// 유저 정보
export const getUserAxios = createAsyncThunk(
  "user/getUserAxios",
  async (_, { dispatch, getState }) => {
    const userInfo = await Userapi.getUser();
    dispatch(setUserInfo(userInfo));
    return userInfo;
  }
);

//createSlice()
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToSession: (state, action) => {
      sessionStorage.setItem("token", action.payload.token);
    },
    setUserInfo: (state, action) => {
      sessionStorage.setItem("user_name", action.payload.user_name);
      sessionStorage.setItem("user_id", action.payload.user_id);
    },
    deleteUserFromSession: (state, action) => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user_name");
      sessionStorage.removeItem("user_id");
    },
    setSignInFalse: (state, action) => {
      state.is_login = false;
    },
  },

  extraReducers: {
    [signUpAxios.fulfilled]: (state, action) => {
      state = state;
    },
    [getUserAxios.fulfilled]: (state, action) => {
      state.user_info = {
        user_name: action.payload.user_name,
        user_id: action.payload.user_id,
      };
      state.is_login = true;
    },
    [signOutAxios.fulfilled]: (state, action) => {
      state.user_info = initialState.user_info;
      state.is_login = false;
      alert("You have successfully been signed out");
    },
  },
});

export const {
  setUserToSession,
  setUserInfo,
  deleteUserFromSession,
  setLogin,
  setSignInFalse,
} = userSlice.actions;

export default userSlice.reducer;
