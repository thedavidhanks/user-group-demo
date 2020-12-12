import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import UserContext from "../context/user-context";
import { hasGroups, isUserVerified, listGroups } from "../common/function";


const SiteContent = () => {
  const [user] = useContext(UserContext);

  return(
      <Container>
        <div>Hello {isUserVerified(user) ? user.attributes.email : null}</div>    
        {isUserVerified(user) && hasGroups(user)? <GroupList groups={listGroups(user)}/> : null}
      </Container>
  );
}

export default SiteContent;

const GroupList = ({groups}) => {
    const listGroups = groups.map((group, index) =>
    <span key={index}>{group}</span>);
    return <span>belongs to: {listGroups}</span>;
}