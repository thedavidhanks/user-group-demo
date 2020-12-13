import React, {useState, useEffect} from "react";
import Amplify from "aws-amplify";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserContext from "./context/user-context";
import SiteContent from './components/SiteContent';
import Banner from './components/Banner';

import './App.css';
import { isUserVerified } from './common/function.js';

const App = () => {
  const [user, setUser] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [ , setEmail] = useState("");  //move email between SignIn & VerificationModal

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
          <Banner hideForms={hideForms} showUpForm={showUpForm} setShowSignIn={setShowSignIn}/>
          {//If not signed in
          !isUserVerified(user) ?  
            <span>
              <SignUp show={showSignUp} hide={hideForms} setShowSignIn={setShowSignIn} />
              <SignIn show={showSignIn} hide={hideForms} signUp={showUpForm} setEmail={setEmail}/>
            </span> : 
            null }
          <SiteContent />
        </UserContext.Provider>
    </div>
  );
}

export default App;
