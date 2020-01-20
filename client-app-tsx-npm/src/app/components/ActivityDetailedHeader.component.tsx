import React from "react";
import {observer} from "mobx-react-lite";

import {Link} from "react-router-dom";

import {Segment, Item, Header, Button, Image, Icon} from "semantic-ui-react";

import {IActivity} from "../models/activity";

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
                                <p>{activity?.date}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached="bottom">
                <Button.Group>
                    <Button animated basic positive type={"button"}>
                        <Button.Content hidden>Join</Button.Content>
                        <Button.Content visible>
                            <Icon name={"exchange"}/>
                        </Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button animated type={"button"} basic negative>
                        <Button.Content hidden>Cancel</Button.Content>
                        <Button.Content visible>
                            <Icon name={"cancel"}/>
                        </Button.Content>
                    </Button>
                </Button.Group>
                <Button animated type={"button"} basic color={"blue"} floated={"right"}>
                    <Button.Content hidden>Manage</Button.Content>
                    <Button.Content visible>
                        <Icon name={"folder outline"}/>
                    </Button.Content>
                </Button>
            </Segment>
        </Segment.Group>
    );
};

export default observer(ActivityDetailedHeader);
