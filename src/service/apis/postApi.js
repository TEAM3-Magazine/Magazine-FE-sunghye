import axios from "axios";

class PostApi {
  constructor() {
    // this.base = process.env.REACT_APP_MOCK_API;
    this.base = process.env.REACT_APP_BF_API;
  }

  getToken = () => sessionStorage.getItem("token");

  async getPosts() {
    const getpostConfig = {
      method: "get",
      url: `${this.base}/api/post`,
      // url: `${this.base}/GetPosts.json`,
      headers: {},
    };

    return axios(getpostConfig)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  // 새 포스트 등록
  async addPost({ postData, navigate }) {
    const addpostConfig = {
      method: "post",
      url: `${this.base}/api/post`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      data: JSON.stringify(postData),
    };

    return axios(addpostConfig)
      .then((res) => {
        alert("your post has been created");
        navigate(`/`, { replace: true });
        return res.data;
      })
      .catch((err) => {
        alert("Fail to create post. please try again.");
        console.log(err.response);
      });
  }

  // 포스트 삭제
  async deletePost({ post_id }) {
    const deletepostConfig = {
      method: "delete",
      url: `${this.base}/api/post/${post_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    };

    return axios(deletepostConfig)
      .then((res) => {
        alert("your post has been deleted");
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert("You don't have permission to delete this post");
        return;
      });
  }

  // 포스트 편집
  async updatePost({ post_id, postData, dispatch, navigate }) {
    const editpostConfig = {
      method: "put",
      url: `${this.base}/api/post/${post_id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
      data: JSON.stringify(postData),
    };

    return axios(editpostConfig)
      .then((res) => {
        alert("your post has been updated");
        navigate("/", { replace: true });
        return res.data;
      })
      .catch((err) => {
        alert("Update could not complete");
        console.log(err.response);
        return false;
      });
  }

  // 좋아요
  async likeUpPost({ post_id, navigate, dispatch }) {
    const likeUpConfig = {
      method: "post",
      url: `${this.base}/api/post/${post_id}/like`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
    return axios(likeUpConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.response);
        alert("You need to sign in first.");
        navigate("/signin", { replace: true });
      });
  }

  // 좋아요 취소
  async likeDownPost({ post_id }) {
    const likeDownConfig = {
      method: "delete",
      url: `${this.base}/api/post/${post_id}/like`,
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    };

    return axios(likeDownConfig)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err.response);
        alert(err.response.data.msg);
      });
  }
}

export default PostApi;
