import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// slice
import { signInAxios } from "../redux/modules/userSlice";

// elements
import { Text, Input, Grid } from "../elements";

// mui
import Button from "@mui/material/Button";

const SignIn = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const pwRef = useRef();

  // 로그인 버튼 클릭시
  const onSignIn = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const pw = pwRef.current.value;

    if (email === "" || pw === "") {
      window.alert("All values cannot be empty.");
      return;
    }

    const signInData = {
      user_email: email,
      user_password: pw,
    };

    dispatch(signInAxios({ signInData, navigate }));
  };

  return (
    <React.Fragment>
      <form onSubmit={onSignIn}>
        <Grid padding="16px" margin="150px 0">
          <Text size="32px" margin="10px 0" bold>
            Sign in
          </Text>

          <Grid padding="16px 0px">
            <Input placeholder="Your email address" _ref={emailRef} />
          </Grid>

          <Grid padding="16px 0px">
            <Input placeholder="password" type="password" _ref={pwRef} />
          </Grid>

          <Button
            type="submit"
            style={{
              backgroundColor: "#686ef3",
              width: "100%",
            }}
            variant="contained"
          >
            sign in
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
