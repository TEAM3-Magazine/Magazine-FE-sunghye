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

// sign up
export const signUpAxios = createAsyncThunk(
  "user/signUpAxios",
  async ({ registerData, navigate }) => {
    //propmise를 반환하는 함수
    // SignUp에서 받아온 registerData, navigate를 api로 보낸다.
    const signUpResult = await Userapi.signUp({ registerData, navigate });
    // signupResult 요청 후 받은 데이터
    return signUpResult;
  }
);

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

export const signOutAxios = createAsyncThunk(
  "user/signOutAxios",
  async ({ navigate }, { dispatch }) => {
    dispatch(deleteUserFromSession());

    navigate("/", { replace: true });
    return;
  }
);

export const getUserAxios = createAsyncThunk(
  "user/getUserAxios",
  async (_, { dispatch, getState }) => {
    const userInfo = await Userapi.getUser();
    console.log("user info api 됨?  ", userInfo);
    dispatch(setUserInfo(userInfo));

    return userInfo;
  }
);
//createSlice()
//리듀서 함수의 객체, slice 이름, initial state 값을 받아들이고
//해당 Action creator와 Action type으로 slice reducer를 자동으로 생성

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToSession: (state, action) => {
      sessionStorage.setItem("token", action.payload.token);
    },

    setLogin: (state, action) => {
      state.is_login = action.payload;
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
  },

  extraReducers: {
    [signUpAxios.fulfilled]: (state, action) => {
      state = state;
    },
    [getUserAxios.fulfilled]: (state, action) => {
      // state.paging.load = !action.payload.last;
      // state.paging.page += 1;

      state.user_info = {
        user_name: action.payload.user_name,
        user_id: action.payload.user_id,
      };
      state.is_login = true;
    },
    [signOutAxios.fulfilled]: (state, action) => {
      state.user_info = initialState.user_info;
      state.is_login = false;
      alert("logout completion");
    },
  },
});

export const { setUserToSession, setUserInfo, deleteUserFromSession } =
  userSlice.actions;

export default userSlice.reducer;
