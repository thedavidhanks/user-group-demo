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
        }
      })
      .catch((err) => console.log(err));
  };

export function resendCode(email, setMsg){
    Auth.resendSignUp(email)
      .then(() => {
        console.log("code resent successfully");
        setMsg("Code sent!");
      })
      .catch((e) => {
        console.log(e);
        setMsg(e.message);
      });
  };