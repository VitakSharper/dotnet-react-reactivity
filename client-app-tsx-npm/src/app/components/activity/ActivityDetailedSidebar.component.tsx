import React from "react";
import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";

import {Segment, List, Item, Label, Image, Popup} from "semantic-ui-react";
import {IAttendee} from "../../models/activity";

const styles = {
    detailSegment: {
        border: "none"
    },
    item: {
        position: "relative",
        itemContentExtra: {
            color: "#FFA726"
        }
    }
};

interface IProps {
    attendees: IAttendee[]
}

const ActivityDetailedSidebar: React.FC<IProps> = ({attendees}) => {
    return (
        <>
            <Segment
                textAlign="center"
                style={styles.detailSegment}
                attached="top"
                secondary
                inverted
                color="teal"
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'}
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {
                        attendees.map((a, idx) => (
                            <Item style={styles.item} key={idx}>

                                <Popup
                                    content={a.following
                                        ? `You are following ${a.displayName[0].toUpperCase()}${a.displayName.substring(1).toLowerCase()}`
                                        : `${a.displayName[0].toUpperCase()}${a.displayName.substring(1).toLowerCase()}`}
                                    trigger={<Image size="tiny" src={a.image || "/assets/user.png"}/>}/>

                                <Item.Content verticalAlign="middle" style={{marginBottom: '2rem'}}>
                                    {a.isHost && <Label
                                        color="orange"
                                        floating
                                        size={"mini"}
                                    >
                                        Host
                                    </Label>}
                                    <Item.Header as="h3">
                                        <Link to={`/profile/${a.username}`}>{a.displayName}</Link>
                                    </Item.Header>
                                    {a.following &&
                                    <Item.Extra style={styles.item.itemContentExtra}>Following</Item.Extra>
                                    }
                                </Item.Content>
                            </Item>
                        ))
                    }
                </List>
            </Segment>
        </>
    );
};

export default observer(ActivityDetailedSidebar);
