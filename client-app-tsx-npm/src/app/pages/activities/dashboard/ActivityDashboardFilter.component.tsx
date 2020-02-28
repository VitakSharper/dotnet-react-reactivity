import React from "react";
import {Menu, Header, Segment} from "semantic-ui-react";
import {Calendar} from "react-widgets";

const ActivityDashboardFilter = () => (
    <Segment >
        <Menu vertical secondary size={"large"} style={{width: "100%", marginTop: 30}}>
            <Header icon={"filter"} attached color={"teal"} content={"Filters"}/>
            <Menu.Item color={"blue"} name={"all"} content={"All Activities"}/>
            <Menu.Item color={"blue"} name={"username"} content={"I'm Going"}/>
            <Menu.Item color={"blue"} name={"host"} content={"I'm hosting"}/>
        </Menu>
        <Header icon={"calendar"} attached color={"teal"} content={"Select Date"}/>
        <Calendar/>
    </Segment>
);

export default ActivityDashboardFilter;
