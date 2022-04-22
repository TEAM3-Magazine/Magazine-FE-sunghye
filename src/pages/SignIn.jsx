import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signInAxios } from "../redux/modules/userSlice";
import { Text, Input, Grid, Button } from "../elements";
// import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

// import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";

const SignIn = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const pwRef = useRef();

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

          <Button text="SIGN IN"></Button>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SignIn;
