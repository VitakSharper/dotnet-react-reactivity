import React, {useState} from "react";
import {withRouter} from 'react-router-dom';
import {Menu, Container, Icon} from 'semantic-ui-react'

const menuBar = {
    background: 'linear-gradient(#009eda, #007cbe,#9575CD 100%)',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid #29B6F6'
};


const NavBar = ({history}) => {
    const [activeItem, setActiveItem] = useState('');

    const handleActivities = (e, menuParams) => {
        setActiveItem(menuParams.name);
        history.push(`/${menuParams.name}`);
    };

    const handleCreate = (e, menuParams) => {
        setActiveItem(menuParams.name)
    };

    const handleHome = (e, menuParams) => {
        setActiveItem(menuParams.name);
        history.push(`/`);
    };

    return (
        <Menu fixed={"top"} borderless style={menuBar}>
            <Container text>
                <Menu.Item>
                    <img src="/assets/logo.png" alt="logo"/>
                </Menu.Item>
                <Menu.Item header>
                    IMeetUp
                </Menu.Item>

                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={(event, params) => handleHome(event, params)}
                >Home</Menu.Item>

                <Menu.Item
                    name='activities'
                    active={activeItem === 'activities'}
                    onClick={(event, params) => handleActivities(event, params)}
                >Activities</Menu.Item>

                <Menu.Item
                    name='createActivity'
                    active={activeItem === 'createActivity'}
                    onClick={(event, params) => handleCreate(event, params)}
                >
                    <Icon name={'add'}/>
                    Add Activity
                </Menu.Item>
            </Container>
        </Menu>
    )
};

export default withRouter(NavBar);
