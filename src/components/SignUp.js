import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FormElement from "./FormElement.js";
import VerificationForm from './VerificationForm';

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [msg, setMsg] = useState("");

  const signUp = (e) => {
    e.preventDefault();
    Auth.signUp({ username: email, password, attributes: { email } })
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
      })
      .catch((err) => {
        console.log(err);
        setMsg(err.message);
      });
  };

  const cleanup = () =>{
    setEmail("");
    setWaitingForCode(false);
    props.hide();
  }

  return (
    <Modal show={props.show} onHide={props.hide} animation={false} >
      <Modal.Header closeButton>
      </Modal.Header>
                
      {!waitingForCode ? 
      (<form>
      <Modal.Body>
        <FormElement label="Email" forId="sign-up-email">
          <input
            id="sign-up-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </FormElement>
        <FormElement label="Password" forId="sign-up-email">
          <input
            id="sign-up-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </FormElement>
        {msg ? msg : null}
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={signUp}>
          Sign Up
        </Button>
      </Modal.Footer>
      
    </form>)
    :
    <VerificationForm email={email} password={password} cleanup={cleanup} />
    }
    </Modal>
  );
};
export default SignUp;