import React, {useContext} from "react";
import {Grid, Tab, Card, Header} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";
import {observer} from "mobx-react-lite";


const ProfileAboutTab = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile} = rootStore.profileStore;

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={8}>
                    <Header floated={"left"} icon={'user'} content={`About ${profile?.displayName}`}/>
                </Grid.Column>
                <Grid.Column width={8}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header content={profile?.displayName}/>
                            <Card.Meta content='Musicians'/>
                            <Card.Description content={profile?.bio}/>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
};

export default observer(ProfileAboutTab);
