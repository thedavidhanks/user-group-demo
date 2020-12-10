import React, { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FormElement from "./FormElement.js";
import UserContext from "../context/user-context";


const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState({})
  
  const signIn = (e) => {
    e.preventDefault();
    Auth.signIn({
      username: email,
      password,
    })
      .then((data) => {
        setEmail("");
        setPassword("");
        // console.log("USER: ");
        // console.log(data);
        setUser(data);
        if(Object.keys(error).length !== 0){setError({});}
      })
      .catch((err) => {
        setError(err);
        setUser({});
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
        {Object.keys(user).length !== 0 && user.attributes.email_verified === true  ? <div>VERIFIED</div> : null}
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

