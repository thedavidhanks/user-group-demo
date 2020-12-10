export function isUser(userObj){
    return Object.keys(userObj).length !== 0 && userObj.attributes.email_verified === true ?
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