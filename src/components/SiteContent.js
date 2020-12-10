import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import UserContext from "../context/user-context";
import { isUser, listGroups } from "../common/function";


const SiteContent = () => {
  const [user, setUser] = useContext(UserContext);

  if(isUser(user)){ 
      console.log("groups: ");
      console.log(listGroups(user));
    }
  return(
      <Container>
        <div>Hello {isUser(user) ? user.attributes.email : null}</div>    
        {isUser(user) ? <GroupList groups={listGroups(user)}/> : null}
      </Container>
  );
}

export default SiteContent;

const GroupList = ({groups}) => {
    const listGroups = groups.map((group, index) =>
    <span key={index}>{group}</span>);
    return <span>belongs to: {listGroups}</span>;
}