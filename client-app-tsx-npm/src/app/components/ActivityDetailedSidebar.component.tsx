import React from "react";
import {Link} from "react-router-dom";
import {Segment, List, Item, Label, Image} from "semantic-ui-react";
import {IAttendee} from "../models/activity";
import {observer} from "mobx-react-lite";

const styles = {
    detailSegment: {
        border: "none"
    },
    item: {
        position: "relative",
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

export default observer(ActivityDetailedSidebar);
