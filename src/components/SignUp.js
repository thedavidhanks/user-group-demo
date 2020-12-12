import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FormElement from "./FormElement.js";

const SignUp = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [waitingForCode, setWaitingForCode] = useState(false);
  const [code, setCode] = useState("");
  const signUp = (e) => {
    e.preventDefault();
    Auth.signUp({ username: email, password, attributes: { email } })
      .then((data) => {
        console.log(data);
        setWaitingForCode(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const confirmSignUp = (e) => {
    e.preventDefault();
    Auth.confirmSignUp(email, code)
      .then((data) => {
        console.log(data);
        if(data === "SUCCESS"){
          Auth.signIn({
            username: email,
            password,
          });
          setEmail("");
          setCode("");
          props.hide();
          setWaitingForCode(false);
        }
        
      })
      .catch((err) => console.log(err));
  };
  const resendCode = () => {
    Auth.resendSignUp(email)
      .then(() => {
        console.log("code resent successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };

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
      </Modal.Body>
      <Modal.Footer>
        <Button type="submit" onClick={signUp}>
          Sign Up
        </Button>
      </Modal.Footer>
      
    </form>)
    :
    (<form>
      <Modal.Body>
        <FormElement label="Confirmation Code" forId="sign-up-code">
          <input
            id="sign-up-code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="code"
          />
        </FormElement>
      </Modal.Body>    
      <Modal.Footer>
        <Button variant="link" onClick={resendCode}>Resend code</Button>
        <Button type="submit" onClick={confirmSignUp}>Confirm Sign Up</Button>
      </Modal.Footer>
    </form>)
    }
    </Modal>
  );
};
export default SignUp;