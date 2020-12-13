import { Auth } from "aws-amplify";

export const confirmSignUp = (e, email, password, code, cleanup) => {
    e.preventDefault();
    Auth.confirmSignUp(email, code)
      .then((data) => {
        console.log(data);
        if(data === "SUCCESS"){
          Auth.signIn({
            username: email,
            password,
          });

          cleanup();
        //   setEmail("");
        //   setCode("");
        //   props.hide();
        //   setWaitingForCode(false);
        }
      })
      .catch((err) => console.log(err));
  };

export const resendCode = (email) => {
    Auth.resendSignUp(email)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };