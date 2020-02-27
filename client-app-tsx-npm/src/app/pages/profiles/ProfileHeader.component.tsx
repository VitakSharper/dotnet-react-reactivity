import React, {useContext} from "react";
import ProfileForm from "../../components/Forms/ProfileForm.component";

import {
    Segment,
    Item,
    Header,
    Popup,
    Button,
    Grid,
    Statistic,
    Divider,
    Reveal,
} from "semantic-ui-react";

import {RootStoreContext} from "../../store/Root.store";
import {observer} from "mobx-react-lite";

const ProfileHeader = () => {
    const rootStore = useContext(RootStoreContext);
    const {isCurrentUser, profile, follow, unFollow, loading} = rootStore.profileStore;
    const {modalState} = rootStore.modalStore;

    const handleFollow = () => {
        profile?.following
            ? unFollow(profile.username)
            : follow(profile!.username)
    };

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile!.image || "/assets/user.png"}/>
                            <Item.Content verticalAlign="middle">
                                <Header as={'h1'}>{profile!.displayName}</Header>
                                {isCurrentUser && <Item.Meta>
                                    <Popup content={'Edit your profile'}
                                           inverted
                                           trigger={
                                               <Button circular color="teal" icon={'edit'}
                                                       onClick={() => modalState(<ProfileForm/>, true)}
                                               />
                                           }/>
                                </Item.Meta>}
                            </Item.Content>
                        </Item>
                        <Item>
                            <Item.Content verticalAlign={"middle"}>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label="Followers" value={profile?.followersCount}/>
                        <Statistic label="Following" value={profile?.followingCount}/>
                    </Statistic.Group>
                    <Divider/>
                    {!isCurrentUser &&
                    <Reveal animated="move">
                        <Reveal.Content visible
                                        style={{width: "100%"}}>
                            <Button fluid
                                    color="teal"
                                    content={profile?.following ? 'Following' : 'Not following'}
                            />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <Button
                                loading={loading}
                                fluid
                                basic
                                color={profile?.following ? "red" : "green"}
                                content={profile?.following ? "Unfollow" : "Follow"}
                                onClick={handleFollow}
                            />
                        </Reveal.Content>
                    </Reveal>
                    }
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default observer(ProfileHeader);
