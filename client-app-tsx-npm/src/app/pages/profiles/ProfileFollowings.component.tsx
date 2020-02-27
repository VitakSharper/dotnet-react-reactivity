import React, {useContext, useEffect} from "react";
import {Tab, Grid, Header, Card} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";
import ProfileCard from "./ProfileCard.component";
import {observer} from "mobx-react-lite";

const ProfileFollowings = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, loadFollowings, followings, loading} = rootStore.profileStore;

    useEffect(() => {
        loadFollowings('following');
    }, [loadFollowings]);

    return (
        <Tab.Pane loading={loading}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated="left"
                        icon="user"
                        content={
                            true
                                ? `People following ${profile!.displayName}`
                                : `People ${profile!.displayName} is following`
                        }
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
