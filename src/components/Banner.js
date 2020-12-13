import React, {useContext} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SignOut from "./SignOut";
import UserContext from "../context/user-context";

import { isUserVerified } from '../common/function.js';

const Banner = (props) => {
  const [ user ] = useContext(UserContext);


  return (
    <Container fluid className="Banner">
    <Row>
        <Col ></Col>
        <Col md={3} sm={4}>
        
        {isUserVerified(user) ?
            <SignOut reset={props.hideForms}/> 
            : 
            <span>
                <Button onClick={() => props.setShowSignIn(true)}>Login</Button>
                <Button variant="link" onClick={props.showUpForm}>Sign Up</Button>
            </span>
        }
        </Col>
    </Row>
    </Container>
  );
}

export default Banner;
