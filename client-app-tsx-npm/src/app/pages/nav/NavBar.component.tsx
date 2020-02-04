import React, {useContext, useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import {observer} from "mobx-react-lite";

import {Menu, Container, Icon, MenuHeaderProps, Image, Dropdown} from 'semantic-ui-react'
import {RootStoreContext} from "../../store/Root.store";

const menuBar = {
    background: 'linear-gradient(#009eda, #007cbe,#9575CD 100%)',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid #29B6F6'
};

const NavBar = () => {
    const rootStore = useContext(RootStoreContext);
    const {user, isLoggedIn, logout} = rootStore.userStore;
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

    const handleLogout = () => {
        logout();
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
                {
                    user &&
                    <Menu.Item position={"right"}>
                        <Image avatar spaced={"right"} src={user?.image || '/assets/user.png'}/>
                        <Dropdown pointing={'top left'} text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/username`} text={'My profile'} icon={'user'}/>
                                <Dropdown.Item onClick={handleLogout} text={'Logout'} icon={'power'}/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                }
            </Container>
        </Menu>)
};

export default observer(NavBar);

