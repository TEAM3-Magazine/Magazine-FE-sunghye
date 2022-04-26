import React, { useEffect, lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

// style
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../styled/GlobalStyles";
import theme from "../styled/theme";

// slices
import { getPostAxios } from "../redux/modules/postSlice";
import { getUserAxios, setSignInFalse } from "../redux/modules/userSlice";

// components & element
import Header from "../components/Header";
import { Spinner, Grid } from "../elements";

// pages
const Home = lazy(() => import("../pages/Home"));
const CardForm = lazy(() => import("../pages/CardForm"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const MyAccount = lazy(() => import("../pages/MyAccount"));
// import TestAPI from "../pages/TestAPI";

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.is_login);
  const hasToken = sessionStorage.getItem("token") ? true : false;

  // console.log(isLogin, hasToken, "로그인했니?");

  useEffect(() => {
    hasToken && dispatch(getUserAxios());
    !hasToken && dispatch(setSignInFalse(false));
  }, [dispatch, hasToken]);

  useEffect(() => {
    dispatch(getPostAxios());
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      {/* prettier-ignore */}
      <Suspense fallback= {<Grid margin="50vh auto"> <Spinner /> </Grid>} >
        <Container>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/post" element={<CardForm />} />
            <Route path="/edit/:post_id" element={<CardForm />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<MyAccount />} />
            {/* <Route path="/test" element={<TestAPI />} /> */}
          </Routes>
        </Container>
      </Suspense>
    </ThemeProvider>
  );
}

const Container = styled.div`
  background-color: #f1f3f4;
  margin: auto;
  ${({ theme }) => theme.device.tablet} {
  }
  ${({ theme }) => theme.device.desktop} {
  }
`;

export default App;
