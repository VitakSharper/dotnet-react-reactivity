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
import {IProfile} from "../../models/profile";
import {RootStoreContext} from "../../store/Root.store";
import {observer} from "mobx-react-lite";

interface IProps {
    profile: IProfile
}

const ProfileHeader: React.FC<IProps> = ({profile: {displayName, image}}) => {
    const rootStore = useContext(RootStoreContext);
    const {isCurrentUser, profile} = rootStore.profileStore;
    const {modalState} = rootStore.modalStore;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={image || "/assets/user.png"}/>
                            <Item.Content verticalAlign="middle">
                                <Header as={'h1'}>{displayName}</Header>
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
                    <Reveal animated="move">
                        <Reveal.Content visible style={{width: "100%"}}>
                            <Button fluid color="teal" content="Following"/>
                        </Reveal.Content>
                        <Reveal.Content hidden>
                            <Button
                                fluid
                                basic
                                color={true ? "red" : "green"}
                                content={true ? "Unfollow" : "Follow"}
                            />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default observer(ProfileHeader);
