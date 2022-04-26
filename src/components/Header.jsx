import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

// slice
import { signOutAxios } from "../redux/modules/userSlice";

// mui
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const Header = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.user);
  // !! true, false 로 바꿔준다 .
  const hasToken = sessionStorage.getItem("token") ? true : false;

  const goToSignIn = () => {
    navigate("/signin", { replace: true });
  };

  const goToSignUp = () => {
    navigate("/signup", { replace: true });
  };

  const goToMyAccount = () => {
    navigate("/account", { replace: true });
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
            <Button
              style={{
                backgroundColor: "#686ef3",
              }}
              variant="contained"
              onClick={goToMyAccount}
            >
              My account
            </Button>
            <Button
              style={{
                color: "#686ef3",
                border: "1px solid #686ef3",
              }}
              variant="outlined"
              onClick={onSignOut}
            >
              Sign out
            </Button>
          </>
        ) : (
          <>
            <Button
              style={{
                backgroundColor: "#686ef3",
              }}
              variant="contained"
              onClick={goToSignIn}
            >
              Sign in
            </Button>
            <Button
              style={{
                color: "#686ef3",
                border: "1px solid #686ef3",
              }}
              variant="outlined"
              onClick={goToSignUp}
            >
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
      font-weight: 500;

      ${device.tablet} {
        font-size: ${fontSizes.xl};
      }
    `;
  }}
`;
export default Header;
