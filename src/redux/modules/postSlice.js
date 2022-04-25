import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import PostApi from "../../service/apis/postApi";
import FBstorage from "../../service/firebase/storage";

const Postapi = new PostApi();
const Storage = new FBstorage();

const initialState = {
  data: [],
  is_loading: false,
};

// 포스트 가져오기
export const getPostAxios = createAsyncThunk(
  "post/getPostAxios",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));
    const response = await Postapi.getPosts({});
    dispatch(setPost(response));
    return response.data;
  }
);

// 포스트 추가
export const addPostAxios = createAsyncThunk(
  "post/addPostAxios",
  async ({ postData, navigate }, { getState, dispatch }) => {
    dispatch(setLoading(true));
    const _image = getState().image.preview;
    const _userid = getState().user.user_info.user_id;
    const url = await Storage.uploadFile(_image, _userid);
    await Postapi.addPost({
      postData: { ...postData, image_url: url },
      navigate,
    });
    // ...........ㅠㅠㅠ...
    dispatch(getPostAxios());
    return;
  }
);

// 포스트 수정
export const updatePostAxios = createAsyncThunk(
  "post/updatePostAxios",
  async ({ postData, post_id, navigate }, { dispatch, getState }) => {
    dispatch(setLoading(true));
    const _image = getState().image.preview;
    const _userId = getState().user.user_info.user_id;
    let result;
    // 이미지 수정 안할 경우
    if (postData.image_url === _image) {
      result = await Postapi.updatePost({
        post_id,
        postData,
        dispatch,
        navigate,
      });
    } else {
      const url = await Storage.uploadFile(_image, _userId);
      result = await Postapi.updatePost({
        post_id,
        postData: { ...postData, image_url: url },
        dispatch,
        navigate,
      });
    }
    return { result, postData, post_id };
  }
);

// 포스트 삭제
export const deletePostAxios = createAsyncThunk(
  "post/deletePostAxios",
  async ({ post_id }, { dispatch }) => {
    await Postapi.deletePost({ post_id, dispatch });
    return { post_id };
  }
);

// 좋아요
export const likeUpAxios = createAsyncThunk(
  "post/likeUpAxios",
  async ({ post_like, post_id, navigate }, { getState, dispatch }) => {
    const user_id = getState().user.user_info.user_id;
    const _post = getState().post.data.find((p) => p.post_id === post_id);
    await Postapi.likeUpPost({ post_id, navigate });
    // console.log("addPost 결과", post_id);
    // ...........ㅠㅠㅠ...
    return { user_id, post_id, post_like, _post };
  }
);

// 좋아요 취소
export const likeDownAxios = createAsyncThunk(
  "post/likeDownAxios",
  async ({ post_like, post_id }, { getState, dispatch }) => {
    const user_id = getState().user.user_info.user_id;
    const _post = getState().post.data.find((p) => p.post_id === post_id);

    await Postapi.likeDownPost({ post_id });
    // ...........ㅠㅠㅠ...
    dispatch(getPostAxios());
    return { user_id, post_id, post_like, _post };
  }
);

// createSlice
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
    },
  },
  extraReducers: {
    [getPostAxios.fulfilled]: (state, action) => {
      state.is_loading = false;
    },
    [addPostAxios.fulfilled]: (state, action) => {
      // state.data.push(action.payload);
      state.is_loading = false;
    },
    [deletePostAxios.fulfilled]: (state, action) => {
      state.data = state.data.filter((post) => post.post_id !== action.payload);
    },
    [updatePostAxios.fulfilled]: (state, action) => {
      if (!action.payload?.post_id) {
        alert("Update could not complete");
        return;
      }
      state.is_loading = false;
    },
    [likeUpAxios.fulfilled]: (state, action) => {
      //  { user_id, post_id, post_like, _post };
      // const { user_id, post_id, post_like, _post } = action.payload;

      // // state.data.push(action.payload);

      // console.log(state.post.data, "efawefewfeawf!!!-----");
      // const index = state.post.findIndex((post) => post.post_id === post_id);
      // console.log(index, "index!!!!");
      // state.post.data[index].post_like.push(user_id);

      state.is_loading = false;
    },
  },
});

export const { setLoading, setPost, setNewPaging } = postSlice.actions;

export default postSlice.reducer;
