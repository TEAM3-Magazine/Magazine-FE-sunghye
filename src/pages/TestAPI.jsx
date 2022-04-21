import axios from "axios";
import React from "react";

const client = axios.create({
  //baseURL: "https://jsonplaceholder.typicode.com/posts",
  baseURL: "http://localhost:3000/data/api",
});

// create 사용해 baseURL 설정, async await으로 더 클린한 코드
const BaseURL = () => {
  const [post, setPost] = React.useState(null);

  // then 안쓰고 콜백
  React.useEffect(() => {
    // getPost()함수는 생성 즉시 호출됨
    async function getPost() {
      const response = await client.get("/GetPosts.json");
      console.log(response.data.data.rows[0]);
      setPost(response.data.data.rows[0]);
    }
    getPost();
  }, []);

  async function deletePost() {
    await client.delete("/GetPosts.json");
    alert("Post deleted!");
    setPost(null);
  }

  if (!post) return "No post!";

  return (
    <div>
      <h1>{post.post_id}</h1>
      <p>{post.contents}</p>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
};

export default BaseURL;
