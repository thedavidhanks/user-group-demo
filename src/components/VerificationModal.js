//This was created to show to users who login, but have not
//confirmed their email.
import React, { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import FormElement from "./FormElement.js";

const VerificationModal = (props) => {

    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState({});

    useEffect(() => {
        setEmail(props.email);
    }, [props.email]);
    const confirmSignUp = (e) => {
        e.preventDefault();
        Auth.confirmSignUp(email, code)
        .then((data) => {
            console.log(data);
            setEmail("");
            setCode("");
            props.hide();
        })
        .catch((err) => console.log(err));
    };
    const resendCode = () => {
        Auth.resendSignUp(email)
        .then(() => {
            console.log("code resent successfully");
            setMsg(`Code sent to ${email}`);
        })
        .catch((e) => {
            console.log(e);
            setMsg(e.message);
        });
    };

    return(
        <Modal onHide={props.hide}show={props.show} animation={false}>
            <Modal.Header closeButton>
                Verify your email
            </Modal.Header>
            <form>
            <Modal.Body>
                please check your email for a confirmation code.
                <FormElement label="Email" forId="sign-up-code">
                <input
                    id="sign-in-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                />
                </FormElement>

                <FormElement label="Confirmation Code" forId="sign-up-code">
                <input
                    id="sign-up-code"
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="code"
                />
                </FormElement>
                {msg != null ? <div>{msg}</div> : null}
            </Modal.Body>    
            <Modal.Footer>
                <Button variant="link" onClick={resendCode}>Resend code</Button>
                <Button type="submit" onClick={confirmSignUp}>Confirm Sign Up</Button>
            </Modal.Footer>
            </form>    
        </Modal>
  );
};
export default VerificationModal;