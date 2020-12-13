//This was created to show to users who login, but have not
//confirmed their email.
import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FormElement from "./FormElement.js";

import { confirmSignUp, resendCode } from "../common/loginFunctions";

const VerificationForm = (props) => {

    const [code, setCode] = useState("");
    
    return(
        <form>
        <Modal.Header closeButton>
            Email unverified.  Please check email.
        </Modal.Header>
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
            {//TODO add error msg and "code sent msg"
            }
        </Modal.Body>    
        <Modal.Footer>
            <Button variant="link" onClick={(e) => resendCode(props.email)}>Resend code</Button>
            <Button type="submit" onClick={(e) => confirmSignUp(e, props.email, props.password, code, props.cleanup)}>Confirm Sign Up</Button>
        </Modal.Footer>
        </form>
  );
};
export default VerificationForm;