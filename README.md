# User and Group template
A React application that utilizes Amplify & Cognito to create users and groups.

## Setting up 
Follow [this guide](https://levelup.gitconnected.com/agnita-authentication-for-create-react-app-using-aws-cognito-80cde1fb781b) to setup Amplify/Cognito
add the env variables to .env at the root of the directory.

REACT_APP_REGION=us-west-2  
REACT_APP_USER_POOL_ID=us-west-2_JKLds8fsj  
REACT_APP_USER_POOL_WEB_CLIENT_ID=8klsjfa8903jfjklfjdsIe9  


I've created multiple groups in Cognito.  New users are added to the default group.

In Lambda
- create a function named addUserToDefaultGroup
- use this code:  

        exports.handler = (event, context, callback) => {  
            console.log(event);  
            const params = {  
                GroupName: "default",  
                UserPoolId: event.userPoolId,  
                Username: event.userName  
            };  
            cisp.adminAddUserToGroup(params, function(err, data) {  
                if (err) console.log(err, err.stack); // an error occurred  
                else{  
                    // successful response  
                    console.log(event.userName + " was added to default group successfully.");  
                    console.log(data);  
                    callback(null, event);  
                }                  
            });  
        }

In Cognito 
- Create a user pool
- Under the user pool general setting go to Triggers
- select the Lambda trigger addUserToDefaultGroup under "Post Confirmation"

## References
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).