import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { BsFillBookmarkFill } from "react-icons/bs";

import { signOutAxios } from "../redux/modules/userSlice";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// import Button from "../elements/Button";
import Grid from "../elements/Grid";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.user);
  console.log(isLogin);
  const hasToken = sessionStorage.getItem("token") ? true : false;
  console.log("로그인 유무 ", isLogin, hasToken);

  const goToSignIn = () => {
    navigate("/signin", { replace: true });
  };

  const goToSignUp = () => {
    navigate("/signup", { replace: true });
  };

  const onSignOut = () => {
    dispatch(signOutAxios({ navigate }));
  };
  return (
    <HeaderContainer>
      <Link to="/">
        <Title>leaveYourMark</Title>
      </Link>

      <Stack spacing={2} direction="row">
        {isLogin && hasToken ? (
          <>
            <Button variant="contained" onClick={goToSignIn}>
              My account
            </Button>
            <Button variant="outlined" onClick={onSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button variant="contained" onClick={goToSignIn}>
              Sign in
            </Button>
            <Button variant="outlined" onClick={goToSignUp}>
              Sign up
            </Button>
          </>
        )}
      </Stack>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  ${({ theme }) => {
    const { colors, device } = theme;
    return css`
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      width: 100%;
      height: 100px;
      background-color: ${colors.headerBgColor};
      box-shadow: 0 2px 5px rgba(130, 130, 130, 0.1);
      ${device.tablet} {
        height: 100px;
      }
    `;
  }}
`;

const Title = styled.h1`
  ${({ theme }) => {
    const { colors, device, fontSizes } = theme;
    return css`
      color: ${colors.black};
      font-size: ${fontSizes.lg};
      font-weight: 600;

      ${device.tablet} {
        font-size: ${fontSizes.xl};
      }
    `;
  }}
`;

// btn

// const Button = styled.button`
//   padding: 0.2em 0.3em;
//   margin-left: 1em;
//   border-radius: 4px;
//   border: 1px solid lightgrey;
//   box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.2);
// `;

// const Button = styled(button)`
//   padding: 0.2em 0.3em;
//   margin-left: 1em;
//   border-radius: 4px;
//   border: 1px solid lightgrey;
//   box-shadow: 2px 2px 3px 1px rgba(0, 0, 0, 0.2);
// `;
export default Header;
