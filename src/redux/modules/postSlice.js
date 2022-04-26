import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
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
    const response = await Postapi.addPost({
      postData: { ...postData, image_url: url },
      navigate,
    });
    dispatch(getPostAxios());
  }
);

// 포스트 수정
export const updatePostAxios = createAsyncThunk(
  "post/updatePostAxios",
  async ({ postData, post_id, navigate }, { dispatch, getState }) => {
    dispatch(setLoading(true));
    const _image = getState().image.preview;
    const _userId = getState().user.user_info.user_id;
    let response;
    let url;
    // 이미지 수정 안할 경우
    if (postData.image_url === _image) {
      url = _image;
      response = await Postapi.updatePost({
        post_id,
        postData,
        dispatch,
        navigate,
      });
    } else {
      url = await Storage.uploadFile(_image, _userId);
      response = await Postapi.updatePost({
        post_id,
        postData: { ...postData, image_url: url },
        dispatch,
        navigate,
      });
    }
    return { response, postData, post_id, url };
  }
);

// 포스트 삭제
export const deletePostAxios = createAsyncThunk(
  "post/deletePostAxios",
  async ({ post_author, post_id, navigate }, { dispatch, getState }) => {
    const user_id = getState().user.user_info.user_id;
    await Postapi.deletePost({ post_id, dispatch });
    return { post_author, post_id, user_id };
  }
);

// 좋아요
export const likeUpAxios = createAsyncThunk(
  "post/likeUpAxios",
  async ({ post_like, post_id, navigate }, { getState, dispatch }) => {
    const user_id = getState().user.user_info.user_id;
    await Postapi.likeUpPost({ post_id, navigate });
    return { user_id, post_id };
  }
);

// 좋아요 취소
export const likeDownAxios = createAsyncThunk(
  "post/likeDownAxios",
  async ({ post_like, post_id }, { getState, dispatch }) => {
    const user_id = getState().user.user_info.user_id;

    await Postapi.likeDownPost({ post_id });
    return { user_id, post_id };
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
      state.is_loading = false;
    },
    [deletePostAxios.fulfilled]: (state, action) => {
      const { post_author, post_id, user_id } = action.payload;
      if (post_author === user_id) {
        state.data = state.data.filter((post) => {
          return post.post_id !== post_id;
        });
      }

      state.is_loading = false;
    },
    [updatePostAxios.fulfilled]: (state, action) => {
      const { postData, post_id, url } = action.payload;
      const postId = Number(post_id);
      const idx = state.data.findIndex((p) => p.post_id === postId);
      state.data[idx] = {
        ...state.data[idx],
        contents: postData.contents,
        image_url: url,
      };
      state.is_loading = false;
    },
    [likeUpAxios.fulfilled]: (state, action) => {
      const { user_id, post_id } = action.payload;
      const idx = state.data.findIndex((p) => p.post_id === post_id);
      state.data[idx].post_like.push(user_id);
      state.is_loading = false;
    },
    [likeDownAxios.fulfilled]: (state, action) => {
      const { user_id, post_id } = action.payload;
      const idx = state.data.findIndex((p) => p.post_id === post_id);
      state.data[idx].post_like = state.data[idx].post_like.filter(
        (id) => id !== user_id
      );
      state.is_loading = false;
    },
  },
});

export const { setLoading, setPost, setNewPaging, deletePost } =
  postSlice.actions;

export default postSlice.reducer;
