export function isUser(userObj){
    return Object.keys(userObj).length !== 0 ?
     true : 
     false;
}

//TODO verify the user's token instead.
export function isUserVerified(userObj){
    if(Object.keys(userObj).length !== 0 && userObj.hasOwnProperty('attributes') && userObj.attributes.email_verified === true)
    return Object.keys(userObj).length !== 0 && userObj.attributes.email_verified === true ?
     true : 
     false;
}


export function hasGroups(userObj){
    return isUser(userObj) && userObj.signInUserSession.accessToken.payload["cognito:groups"] ?
    true : 
    false;
}

export function listGroups(userObj){
    let groupList = null;
    if(isUser(userObj) && userObj.signInUserSession.accessToken.payload){
        groupList = userObj.signInUserSession.accessToken.payload["cognito:groups"];
    }
    return groupList;
}