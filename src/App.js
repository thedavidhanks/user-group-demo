import React, {useState, useEffect} from "react";
import Amplify from "aws-amplify";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import SignOut from "./components/SignOut";
import UserContext from "./context/user-context";
import SiteContent from './components/SiteContent';

import { isUser } from './common/function.js';

const App = () => {
  const [user, setUser] = useState("");
  const [showSignUp, setShowSignUp] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)

  useEffect(() => {
    Amplify.configure({
      Auth: {
        region: process.env.REACT_APP_REGION,
        userPoolId: process.env.REACT_APP_USER_POOL_ID,
        userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID
      }
    })
  })

  const showUpForm = (e) =>{
    e.preventDefault(); 
    if(showSignIn){setShowSignIn(false);}
    setShowSignUp(true);
    
  }

  const hideForms = () =>{
    if(showSignIn){setShowSignIn(false);}
    if(showSignUp){setShowSignUp(false);}
  }
  return (
    <div className="App">
        <UserContext.Provider value={[user,setUser]}>
          <Container>
            <Row>
              <Col ></Col>
              <Col md={3} sm={4}>
                {//If not signed in
                Object.keys(user).length === 0 ?  
                <span>
                  <Button onClick={() => setShowSignIn(true)}>Login</Button>
                  <Button variant="link" onClick={showUpForm}>Sign Up</Button>
                </span>
                :
                null}
                {//if user is signed in
                isUser(user) ?
                <SignOut reset={hideForms}/> : 
                
                null }
              </Col>
            </Row>
          </Container>
          {//If not signed in
          !isUser(user) ?  
            <span>
              <SignUp show={showSignUp} hide={hideForms} />
              <SignIn show={showSignIn} hide={hideForms} signUp={showUpForm} />
            </span> : 
            null }
          <SiteContent />
        </UserContext.Provider>
    </div>
  );
}

export default App;
