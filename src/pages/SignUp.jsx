import React, { useRef, createRef } from "react";
import { Text, Input, Grid, Button } from "../elements";
// import { getCookie, setCookie, deleteCookie } from "../shared/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// sign up reducer
import { signUpAxios } from "../redux/modules/userSlice";
// import { actionCreators as userActions } from "../redux/modules/user";
// import { emailCheck } from "../shared/common";

const SignUp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user.is_login);

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
      window.alert("아이디, 패스워드, 닉네임을 모두 입력해주세요!");
      return;
    }

    // if (!emailCheck(id)) {
    //   window.alert("이메일 형식이 맞지 않습니다!");
    //   return;
    // }

    // if (pwd !== pwd_check) {
    //   window.alert("패스워드와 패스워드 확인이 일치하지 않습니다!");
    //   return;
    // }

    const registerData = {
      user_email: email,
      user_name: userName,
      user_password: pw,
      user_password_check: pwCheck,
    };

    // user 리덕스 signupFB에 id, pwd, user_name 넘겨줌
    console.log("sign up data!! ", registerData);
    // signUpAxios함수에 navigate도 같이보냄 (/login)으로 이동하기 위함,
    // api에서도
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

          <Button text="SIGN UP"></Button>
        </Grid>
      </form>
    </React.Fragment>
  );
};

export default SignUp;
