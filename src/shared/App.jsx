import "./App.css";
import axios from "axios";
import TestAPI from "../pages/TestAPI";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

//
import { useSelector, useDispatch } from "react-redux";

// pages
import CardForm from "../pages/CardForm";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

// components
import Home from "../pages/Home";
import Header from "../components/Header";

// style
import GlobalStyles from "../styled/GlobalStyles";
import theme from "../styled/theme";
import { useEffect } from "react";

import { getPostAxios } from "../redux/modules/postSlice";
import { getUserAxios } from "../redux/modules/userSlice";

function App() {
  const dispatch = useDispatch();
  // 질문하기
  const isLogin = useSelector((state) => state.user.is_login);
  const hasToken = sessionStorage.getItem("token") ? true : false;

  console.log("홈페이지 로그인됐니 ?", isLogin, hasToken);
  useEffect(() => {
    hasToken && dispatch(getUserAxios());
    // dispatch(setNewPaging());
    dispatch(getPostAxios());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Header />
      <Container>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/post" element={<CardForm />} />
          <Route path="/test" element={<TestAPI />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

const Container = styled.div`
  background-color: #f1f3f4;
  ${({ theme }) => theme.device.tablet} {
  }
  ${({ theme }) => theme.device.desktop} {
  }
`;

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Layout />}>

//         <Route index element={<PostsList />} />

//         <Route path="post">
//           <Route index element={<AddPostForm />} />
//           <Route path=":postId" element={<SinglePostPage />} />
//           <Route path="edit/:postId" element={<EditPostForm />} />
//         </Route>

//         <Route path="user">
//           <Route index element={<UsersList />} />
//           <Route path=":userId" element={<UserPage />} />
//         </Route>

//         {/* Catch all - replace with 404 component if you want */}
//         <Route path="*" element={<Navigate to="/" replace />} />

//       </Route>
//     </Routes>
//   );
// }
export default App;
