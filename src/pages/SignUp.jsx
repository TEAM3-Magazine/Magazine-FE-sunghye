import React from "react";
import { Text, Input, Grid, Button } from "../elements";
// import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";

const SignUp = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");
  const [pwd_check, setPwdCheck] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  const onSignup = () => {
    //console.log(id);

    if (id === "" || pwd === "" || user_name === "") {
      window.alert("All values cannot be empty.");
      return;
    }

    if (pwd !== pwd_check) {
      window.alert("Those passwords didn’t match. Try again.");
      return;
    }
    // dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px" margin="150px auto">
        <Text size="32px" margin="10px 0" bold>
          Sign up
        </Text>

        <Grid padding="16px 0px">
          <Input
            placeholder="Your email address"
            _onChange={(e) => {
              setId(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px">
          <Input
            placeholder="Display name"
            _onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
        </Grid>

        <Grid padding="16px 0px" is_flex>
          <Grid margin="0 10px 0 0">
            <Input
              type="password"
              placeholder="Password"
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
            />
          </Grid>
          <Grid>
            <Input
              type="password"
              placeholder="Confirm password"
              _onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
            />
          </Grid>
        </Grid>

        <Button
          text="SIGN UP"
          _onClick={() => {
            console.log("completed sign up");
            onSignup();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default SignUp;
