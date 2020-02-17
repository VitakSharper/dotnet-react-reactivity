import React, {useContext} from "react";
import {observer} from "mobx-react-lite";

import {Link} from "react-router-dom";
import {format} from 'date-fns'

import {Segment, Item, Header, Button, Image, Icon} from "semantic-ui-react";

import {IActivity} from "../models/activity";
import {RootStoreContext} from "../store/Root.store";

const styles = {
    activityTopSegment: {
        padding: 0
    },
    activityImageStyle: {
        filter: "brightness(30%)"

    },
    activityImageTextStyle: {
        position: "absolute",
        bottom: "5%",
        left: "5%",
        width: "100%",
        height: "auto",
        color: "white"
    },
    header: {
        color: "#fff"
    }
};

type someProps = {
    activity: IActivity | undefined;
}

const ActivityDetailedHeader: React.FC<someProps> = ({activity}) => {
    const rootStore = useContext(RootStoreContext);
    const {attendActivity, cancelAttendance, submitting} = rootStore.activityStore;
    const host = activity?.attendees.filter(a => a.isHost)[0];

    return (
        <Segment.Group>
            <Segment basic attached="top" style={styles.activityTopSegment}>
                <Image src={`/assets/categoryImages/${activity?.category}.jpg`} fluid
                       style={styles.activityImageStyle}/>
                <Segment basic style={styles.activityImageTextStyle}>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size="huge"
                                    content={activity?.title}
                                    style={styles.header}
                                />
                                <p>{format(activity?.date!, 'eeee do MMMM')}</p>
                                <p>
                                    Hosted by <Link to={`/profile/${host?.displayName}`}><strong>Bob</strong></Link>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached="bottom">
                {
                    activity?.isHost
                        ? (<Button animated type={"button"} basic color={"blue"} floated={"right"}
                                   loading={submitting}
                                   as={Link} to={`/manageActivity/${activity?.id}`}>
                            <Button.Content hidden>Manage</Button.Content>
                            <Button.Content visible>
                                <Icon name={"folder outline"}/>
                            </Button.Content>
                        </Button>)
                        : activity?.isGoing
                        ? (<Button animated type={"button"} basic negative
                                   loading={submitting}
                                   onClick={cancelAttendance}>
                            <Button.Content hidden>Cancel</Button.Content>
                            <Button.Content visible>
                                <Icon name={"cancel"}/>
                            </Button.Content>
                        </Button>)
                        : (<Button animated basic positive type={"button"}
                                   loading={submitting}
                                   onClick={attendActivity}>
                            <Button.Content hidden>Join</Button.Content>
                            <Button.Content visible>
                                <Icon name={"exchange"}/>
                            </Button.Content>
                        </Button>)
                }
            </Segment>
        </Segment.Group>
    );
};

export default observer(ActivityDetailedHeader);
