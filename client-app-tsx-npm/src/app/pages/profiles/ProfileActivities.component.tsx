import React, {useEffect, useContext} from "react";
import {observer} from "mobx-react-lite";
import {Tab, Grid, Header, Card, Image, TabProps} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {IUserActivity} from "../../models/profile";
import {format} from "date-fns";
import {RootStoreContext} from "../../store/Root.store";

const panes = [
    {menuItem: "Future Events", pane: {key: "futureEvents"}},
    {menuItem: "Past Events", pane: {key: "pastEvents"}},
    {menuItem: "Hosting", pane: {key: "hosted"}}
];

const ProfileActivities = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        loadUserActivities,
        profile,
        loadingActivities,
        userActivities
    } = rootStore.profileStore!;

    useEffect(() => {
        loadUserActivities(profile!.username);
    }, [loadUserActivities, profile]);

    const handleTabChange = (
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
        data: TabProps
    ) => {
        loadUserActivities(profile!.username, translatePredicate(data));
    };

    const translatePredicate = (data: TabProps) => {
        switch (data.activeIndex) {
            case 1:
                return "past";
            case 2:
                return "hosting";
            default:
                return "future";
        }
    };

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icon="calendar" content={"Activities"}/>
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{secondary: true, pointing: true}}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br/>
                    <Card.Group itemsPerRow={4}>
                        {userActivities.map((activity: IUserActivity) => (
                            <Card
                                as={Link}
                                to={`/activities/${activity.id}`}
                                key={activity.id}
                            >
                                <Image
                                    src={`/assets/categoryImages/${activity.category}.jpg`}
                                    style={{minHeight: 100, objectFit: "cover"}}
                                />
                                <Card.Content>
                                    <Card.Header textAlign="center">{activity.title}</Card.Header>
                                    <Card.Meta textAlign="center">
                                        <div>{format(new Date(activity.date), "do LLL")}</div>
                                        <div>{format(new Date(activity.date), "h:mm a")}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileActivities);
