import React, { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FormElement from "./FormElement.js";
import UserContext from "../context/user-context";
import { isUser, isUserVerified } from "../common/function.js";


const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ , setUser] = useContext(UserContext);
  const [error, setError] = useState({})
  
  const signIn = (e) => {
    e.preventDefault();
    Auth.signIn({
      username: email,
      password,
    })
      .then((data) => {
        if(isUser(data) && !isUserVerified(data)){
          
          console.log("user email is not verified");
          
          //show the verify email form
          props.setEmail(email);
          props.showVerify();
          
        }else if(isUserVerified(data)){
          setUser(data);
        }
        if(Object.keys(error).length !== 0){setError({});}
        //clear the form
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        setError(err);
        setUser({});
        if(err.code === "UserNotConfirmedException"){
          //User has not confirmed email code.
          //show confirmation code entry / resend options.
        }
        console.log("Login Error: "+err.message);
      });
  };

  const reset = () => {
    setError({});
    props.hide();
  }
  return (
    <Modal show={props.show} onHide={reset} animation={false}>
      <form>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        
        <FormElement label="Email" forId="sign-in-email">
            <input
              id="sign-in-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
            />
          </FormElement>
          <FormElement label="Password" forId="sign-in-password">
            <input
              id="sign-in-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
            />
          </FormElement>
        {error.message != null ? <div>{error.message}</div> : null}
      </Modal.Body>
      <Modal.Footer>
        Not a user?.. 
        <Button variant="link" onClick={props.signUp}>signup</Button>
        <Button type="submit" onClick={signIn}>
          Sign In
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
    
  );
};
export default SignIn;

