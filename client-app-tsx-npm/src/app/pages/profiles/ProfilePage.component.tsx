import React, {useContext, useEffect} from "react";
import {RouteComponentProps} from 'react-router';

import ProfileHeader from "./ProfileHeader.component";
import ProfileContent from "./ProfileContent.component";
import LoadingSpinner from "../../components/LoadingSpinner.component";

import {Grid, Segment} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";
import {observer} from "mobx-react-lite";

interface RouteParams {
    username: string
}

interface IProps extends RouteComponentProps<RouteParams> {
}

const ProfilePage: React.FC<IProps> = ({match}) => {
    const rootStore = useContext(RootStoreContext);
    const {Load, loadingProfile, profile} = rootStore.profileStore;

    useEffect(() => {
        Load(match.params.username);
    }, [Load, match]);

    if (loadingProfile) return <LoadingSpinner inverted content={'Loading profile...'}/>;

    return (
        <Grid>
            <Grid.Column width={16}>
                <Segment>
                    <ProfileHeader profile={profile!}/>
                    <ProfileContent/>
                </Segment>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ProfilePage);
