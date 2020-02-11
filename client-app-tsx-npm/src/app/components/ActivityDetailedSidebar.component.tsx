import React from "react";
import {Link} from "react-router-dom";
import {Segment, List, Item, Label, Image} from "semantic-ui-react";
import {IAttendee} from "../models/activity";

const styles = {
    detailSegment: {
        border: "none"
    },
    item: {
        position: "relative",
        listLabel: {
            position: "absolute",
            marginLeft: "1rem"
        },
        itemContentExtra: {
            color: "orange"
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
                                <Image size="tiny" src={a.image || "/assets/user.png"}/>
                                <Item.Content verticalAlign="middle">
                                    <Item.Header as="h3">
                                        <Link to={`/profile/${a.username}`}>{a.displayName}</Link>
                                        {a.isHost && <Label
                                            style={styles.item.listLabel}
                                            color="orange"
                                            tag
                                            size={"mini"}
                                        >
                                            Host
                                        </Label>}
                                    </Item.Header>
                                    <Item.Extra style={styles.item.itemContentExtra}>Following</Item.Extra>
                                </Item.Content>
                            </Item>
                        ))
                    }
                </List>
            </Segment>
        </>
    );
};

export default ActivityDetailedSidebar;
