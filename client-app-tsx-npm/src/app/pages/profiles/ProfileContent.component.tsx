import React from "react";
import {Tab} from "semantic-ui-react";

import ProfilePhotosTab from "./ProfilePhotosTab.component";
import ProfileAboutTab from "./ProfileAboutTab.component";

const panes = [
    {menuItem: 'About', render: () => <ProfileAboutTab/>},
    {menuItem: 'Photos', render: () => <ProfilePhotosTab/>},
    {menuItem: 'Activities', render: () => <Tab.Pane> Activities Content</Tab.Pane>},
    {menuItem: 'Followers', render: () => <Tab.Pane> Followers Content</Tab.Pane>},
    {menuItem: 'Following', render: () => <Tab.Pane> Following Content</Tab.Pane>},
];

const ProfileContent = () => {

    return (
        <Tab
            menu={{fluid: true, vertical: true, secondary: true}}
            menuPosition={'right'}
            panes={panes}
        />
    )
};

export default ProfileContent;
