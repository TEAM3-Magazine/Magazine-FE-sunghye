import React from "react";
import { Text, Input, Grid, Button } from "../elements";
// import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";

import { useDispatch } from "react-redux";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";

const SignIn = (props) => {
  const dispatch = useDispatch();

  const [id, setId] = React.useState("");
  const [pwd, setPwd] = React.useState("");

  const onSignin = () => {
    //console.log(id);

    if (id === "" || pwd === "") {
      window.alert("All values cannot be empty.");
      return;
    }

    // dispatch(userActions.loginFB(id, pwd));
  };

  return (
    <React.Fragment>
      <Grid padding="16px" margin="150px 0">
        <Text size="32px" margin="10px 0" bold>
          Sign in
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
            placeholder="password"
            type="password"
            _onChange={(e) => {
              setPwd(e.target.value);
            }}
            value={pwd}
            is_submit
            onSubmit={onSignin}
          />
        </Grid>

        <Button
          text="SIGN IN"
          _onClick={() => {
            console.log("로그인 했어!");
            onSignin();
          }}
        ></Button>
      </Grid>
    </React.Fragment>
  );
};

export default SignIn;
