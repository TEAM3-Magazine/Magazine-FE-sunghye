import axios from "axios";

class UserApi {
  constructor() {
    this.base = process.env.REACT_APP_BF_API;
  }

  getToken = () => sessionStorage.getItem("token");

  // sing up 요청 양식
  // {
  //   “user_email”: “lim@lim”,
  //   “user_name”: “limjae”,
  //   “user_password”: “test1234",
  //   “user_password_check”: “test1234"
  //   }

  async signUp({ registerData, navigate }) {
    console.log(registerData, "registerData in api");
    const sighupConfig = {
      method: "post",
      url: `${this.base}/user/signup`,
      headers: {
        "content-type": "application/json",
      },
      data: JSON.stringify(registerData),
    };

    return axios(sighupConfig)
      .then((res) => {
        window.alert("Successful sign up 😀");
        navigate("/signin", { replace: true });
        return res.data;
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        alert("Failed to sign up: " + err.response.data.msg);
      });
  }

  // sign in 요청 양식
  // loginData = {
  //   user_email: cc@cc.com,
  //   user_password: ccc1234,
  //   }
  //   Authorization : token

  async signIn({ signInData, navigate }) {
    // console.log(signInData, "loginData in api");
    const signinConfig = {
      method: "post",
      url: `${this.base}/user/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(signInData),
    };

    return axios(signinConfig)
      .then((res) => {
        // console.log(res, "⭕️ user/login api 잘 받아옴 ");
        alert("Successful sign in 🐣");
        navigate("/", { replace: true });
        return res.data;
      })
      .catch((err) => {
        alert("Failed to sign in : " + err.response.data.msg);
        console.log(err.msg);
      });
  }

  async signOut({ navigate }) {
    const signoutConfig = {
      method: "post",
      url: `${this.base}/user/logout`,
      headers: {
        "X-AUTH-TOKEN": this.getToken(),
      },
    };

    return axios(signoutConfig)
      .then((res) => {
        alert("Successful sign out 😀");
        navigate("/", { replace: true });
        return true;
      })
      .catch((err) => {
        console.log(err);
        console.log(err.data, "sign out error!!");
        return false;
      });
  }

  async getUser() {
    const getUserConfig = {
      method: "get",
      url: `${this.base}/user/userinfo`,
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    };
    return axios(getUserConfig)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err, "Fail to get user infomation ");
      });
  }
}

export default UserApi;
