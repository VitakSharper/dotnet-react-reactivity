import React, {useContext} from "react";
import {Menu, Header, Segment} from "semantic-ui-react";
import {Calendar} from "react-widgets";
import {RootStoreContext} from "../../../store/Root.store";
import {observer} from "mobx-react-lite";

const ActivityDashboardFilter = () => {
    const rootContext = useContext(RootStoreContext);
    const {filtering, setFiltering} = rootContext.activityStore;

    return (
        <Segment>
            <Menu vertical secondary size={"large"} style={{width: "100%", zIndex: '1'}}>
                <Header icon={"filter"} attached color={"teal"} content={"Filters"}/>
                <Menu.Item
                    name={"all"}
                    color={"blue"}
                    content={"All Activities"}
                    active={filtering.size === 0}
                    onClick={() => setFiltering('all', true)}
                />

                <Menu.Item
                    color={"blue"}
                    name={"username"}
                    content={"I'm Going"}
                    active={filtering.has('isGoing')}
                    onClick={() => setFiltering('isGoing', true)}
                />
                <Menu.Item
                    color={"blue"}
                    name={"host"}
                    content={"I'm hosting"}
                    active={filtering.has('isHost')}
                    onClick={() => setFiltering('isHost', true)}
                />
            </Menu>
            <Header icon={"calendar"} attached color={"teal"} content={"Select Date"}/>
            <Calendar
                onChange={(date) => setFiltering('startDate', date!)}
                value={filtering.get('startDate') || new Date()}
            />
        </Segment>
    )
};

export default observer(ActivityDashboardFilter);
