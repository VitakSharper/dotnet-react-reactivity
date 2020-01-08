import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import {Menu, Container, Icon, MenuHeaderProps} from 'semantic-ui-react'
import ActivityFormModal from "./ActivityFormModal.component";
import {IActivity} from "../../app/models/activity";

const menuBar = {
    background: 'linear-gradient(#009eda, #007cbe,#9575CD 100%)',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
    borderBottom: '1px solid #29B6F6'
};


const NavBar = () => {
    const [activeItem, setActiveItem] = useState('');
    const [open, setOpen] = useState(false);
    const [createMode, setCreateMode] = useState(false);


    const history = useHistory();

    const handleActivitiesClick = (e: React.MouseEvent, menuParams: MenuHeaderProps[]) => {
        setActiveItem(menuParams[0].name);
        history.push(`/${menuParams[0].name}`);
    };

    const handleCreate = (e: React.MouseEvent, menuParams: MenuHeaderProps[]) => {
        setActiveItem(menuParams[0].name);
        setCreateMode(true);
        setOpen(true)
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
                    name='activities'
                    active={activeItem === 'activities'}
                    onClick={(e, ...menuParams) => handleActivitiesClick(e, menuParams)}
                >Activities</Menu.Item>

                <Menu.Item
                    name='createActivity'
                    onClick={(e, ...menuParams) => handleCreate(e, menuParams)}
                    active={activeItem === 'createActivity'}
                >
                    <Icon name={'add'}/>
                    Add Activity
                </Menu.Item>
            </Container>
            <ActivityFormModal
                open={open}
                setOpen={setOpen}
                createMode={createMode}
                setCreateMode={setCreateMode}
            />
        </Menu>
    )
};

export default NavBar;
