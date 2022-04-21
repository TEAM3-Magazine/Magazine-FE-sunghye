import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PostApi from "../../service/apis/postApi";

const Postapi = new PostApi();

const initialState = {
  data: [],
  // paging: { load: true, size: 6, page: 1, sortBy: "createdAt" },
  is_loading: false,
};

//createAsyncThunk
//Action Type 문자열과 Promise를 반환하는 함수를 수락하고
//pending/fulfilled/rejected 해당 Promise를 기반으로
//Action Type을 전달하는 Thunk를 생성

export const getPostAxios = createAsyncThunk(
  "post/getPostAxios",
  async (_, { dispatch, getState }) => {
    dispatch(setLoading(true));
    // const { page, size, sortBy } = getState().post.paging;
    const response = await Postapi.getPosts();
    dispatch(setPost(response));
    console.log(" get 된거야? ", response);
    return response.data;
  }
);

// reducer action 만들기..
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.is_loading = action.payload;
    },
    setPost: (state, action) => {
      const postlist = action.payload;
      state.data = postlist;
      console.log(state.data, "setPost data");
      //state.data = [...state.data, ...postlist];
    },
  },
  extraReducers: {
    [getPostAxios.fulfilled]: (state, action) => {
      // state.paging.load = !action.payload.last;
      // state.paging.page += 1;
      state.is_loading = false;
    },
  },
});

export const { setLoading, setPost } = postSlice.actions;

export default postSlice.reducer;
