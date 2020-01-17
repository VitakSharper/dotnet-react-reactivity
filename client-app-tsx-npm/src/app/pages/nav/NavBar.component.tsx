import React, {useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {observer} from "mobx-react-lite";

import {Menu, Container, Icon, MenuHeaderProps} from 'semantic-ui-react'

const menuBar = {
    background: 'linear-gradient(#009eda, #007cbe,#9575CD 100%)',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid #29B6F6'
};

const NavBar = () => {
    const [activeItem, setActiveItem] = useState('');

    const history = useHistory();

    const handleActivities = (e: React.MouseEvent, menuParams: MenuHeaderProps[]) => {
        setActiveItem(menuParams[0].name);
        history.push(`/${menuParams[0].name}`);
    };

    const handleHome = (e: React.MouseEvent, menuParams: MenuHeaderProps[]) => {
        setActiveItem(menuParams[0].name);
        history.push('/');
    };

    return (
        <Menu fixed={"top"} borderless style={menuBar}>
            <Container text>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo"/>
                </Menu.Item>
                <Menu.Item header>
                    IMeetUp
                </Menu.Item>

                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={(e, ...menuParams) => handleHome(e, menuParams)}
                >Home</Menu.Item>

                <Menu.Item
                    name='activities'
                    active={activeItem === 'activities'}
                    onClick={(e, ...menuParams) => handleActivities(e, menuParams)}
                >Activities</Menu.Item>

                <Menu.Item as={Link} to={'/createActivity'}>
                    <Icon name={'add'}/>
                    Add Activity
                </Menu.Item>
            </Container>
        </Menu>)
};

export default observer(NavBar);

