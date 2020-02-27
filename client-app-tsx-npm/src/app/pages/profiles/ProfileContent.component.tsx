import React from "react";
import {Tab} from "semantic-ui-react";

import ProfilePhotosTab from "./ProfilePhotosTab.component";
import ProfileAboutTab from "./ProfileAboutTab.component";
import ProfileFollowings from "./ProfileFollowings.component";

const panes = [
    {menuItem: 'About', render: () => <ProfileAboutTab/>},
    {menuItem: 'Photos', render: () => <ProfilePhotosTab/>},
    {menuItem: 'Activities', render: () => <Tab.Pane> Activities Content</Tab.Pane>},
    {menuItem: 'Followers', render: () => <ProfileFollowings/>},
    {menuItem: 'Following', render: () => <ProfileFollowings/>},
];

interface IProps {
    activeTab: (activeIndex: any) => void;
}

const ProfileContent: React.FC<IProps> = ({activeTab}) => {

    return (
        <Tab
            menu={{fluid: true, vertical: true, secondary: true}}
            menuPosition={'right'}
            panes={panes}
            onTabChange={(e, data) => activeTab(data.activeIndex)}
        />
    )
};

export default ProfileContent;
