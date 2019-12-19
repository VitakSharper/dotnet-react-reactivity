import React from 'react'
import {List} from 'semantic-ui-react'


const NavLink: React.FC = () => (
    <List link horizontal bulleted style={{margin: '0 auto'}}>
        <List.Item active>Home</List.Item>
        <List.Item as='a'>About</List.Item>
        <List.Item as='a'>Jobs</List.Item>
        <List.Item as='a'>Team</List.Item>
    </List>
);

export default NavLink;
