import React, { useRef } from "react";
import { Text, Input, Grid } from "../elements";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// sign up reducer
import { signUpAxios } from "../redux/modules/userSlice";

// mui
import Button from "@mui/material/Button";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ref
  const emailRef = useRef();
  const userNameRef = useRef();
  const pwRef = useRef();
  const pwCheckRef = useRef();

  const onSignUp = (e) => {
    e.preventDefault();
    //submit은 작동되지만 새로 실행되는건 아니다

    //ref로 input 값을 받아온다
    const email = emailRef.current?.value;
    const userName = userNameRef.current?.value;
    const pw = pwRef.current?.value;
    const pwCheck = pwCheckRef.current?.value;

    if (email === "" || pw === "" || userName === "" || pwCheck === "") {
      window.alert("All values cannot be empty.");
      return;
    }

    const registerData = {
      user_email: email,
      user_name: userName,
      user_password: pw,
      user_password_check: pwCheck,
    };

    dispatch(signUpAxios({ registerData, navigate }));
    return;
  };

  return (
    <React.Fragment>
      <form onSubmit={onSignUp}>
        <Grid padding="16px" margin="150px auto">
          <Text size="32px" margin="10px 0" bold>
            Sign up
          </Text>

          <Grid padding="16px 0px">
            <Input placeholder="Your email address" _ref={emailRef} />
          </Grid>

          <Grid padding="16px 0px">
            <Input placeholder="Display name" _ref={userNameRef} />
          </Grid>

          <Grid padding="16px 0px" is_flex>
            <Grid margin="0 10px 0 0">
              <Input type="password" placeholder="Password" _ref={pwRef} />
            </Grid>
            <Grid>
              <Input
                type="password"
                placeholder="Confirm password"
                _ref={pwCheckRef}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            style={{
              backgroundColor: "#686ef3",
              width: "100%",
            }}
            variant="contained"
          >
            sign up
          </Button>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
