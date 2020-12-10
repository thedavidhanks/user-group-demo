import React, { useContext } from "react";
import { Auth } from "aws-amplify";
import Button from 'react-bootstrap/Button';


import UserContext from "../context/user-context";

const SignOut = (props) => {
  const [user, setUser] = useContext(UserContext)
  async function signOut() {
    try {
        await Auth.signOut()
        .then( (e) =>{
          console.log("signed out");
          props.reset();
          setUser({});
        });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}
  return(
    <Button onClick={signOut}>Logout</Button>
  );
}

export default SignOut;