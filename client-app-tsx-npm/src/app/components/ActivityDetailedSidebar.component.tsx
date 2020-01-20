import React from "react";
import {Link} from "react-router-dom";
import {Segment, List, Item, Label, Image} from "semantic-ui-react";

const styles = {
    detailSegment: {
        border: "none"
    },
    item1: {
        position: "relative",
        listLabel: {
            position: "absolute"
        },
        itemContentExtra: {
            color: "orange"
        }
    },
    item2: {
        position: "relative",
        extra: {
            color: "orange"
        }
    },
    item3: {
        position: "relative"
    }
};

const ActivityDetailedSidebar = () => {
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
                3 People Going
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    <Item style={styles.item1}>
                        <Label
                            style={styles.item1.listLabel}
                            color="orange"
                            ribbon="right"
                        >
                            Host
                        </Label>
                        <Image size="tiny" src={"/assets/user.png"}/>
                        <Item.Content verticalAlign="middle">
                            <Item.Header as="h3">
                                <Link to={`#`}>Bob</Link>
                            </Item.Header>
                            <Item.Extra style={styles.item1.itemContentExtra}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={styles.item2}>
                        <Image size="tiny" src={"/assets/user.png"}/>
                        <Item.Content verticalAlign="middle">
                            <Item.Header as="h3">
                                <Link to={`#`}>Tom</Link>
                            </Item.Header>
                            <Item.Extra style={styles.item2.extra}>Following</Item.Extra>
                        </Item.Content>
                    </Item>

                    <Item style={styles.item3}>
                        <Image size="tiny" src={"/assets/user.png"}/>
                        <Item.Content verticalAlign="middle">
                            <Item.Header as="h3">
                                <Link to={`#`}>Sally</Link>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </List>
            </Segment>
        </>
    );
};

export default ActivityDetailedSidebar;
