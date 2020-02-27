import React, {useContext} from "react";
import {Tab, Grid, Header, Card} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";
import ProfileCard from "./ProfileCard.component";
import {observer} from "mobx-react-lite";

const ProfileFollowings = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, followings, loading, activeTab} = rootStore.profileStore;

    const menu: any = {
        3: {item: `People following ${profile!.displayName}`},
        4: {item: `People ${profile!.displayName} is following`}
    };

    return (
        <Tab.Pane loading={loading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated="left"
                        icon="user"
                        content={menu[activeTab].item}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={5}>
                        {
                            followings.map((f, idx) => (
                                <ProfileCard key={idx} profile={f}/>
                            ))
                        }
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfileFollowings);
