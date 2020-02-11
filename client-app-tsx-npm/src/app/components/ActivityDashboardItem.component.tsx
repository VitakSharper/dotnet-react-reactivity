import React, {SyntheticEvent} from 'react'
import {Item, Button, Label, Icon, Segment} from 'semantic-ui-react'
import {IActivity} from "../models/activity";
import {format} from 'date-fns';

import ActivityListItemAttendees from "../pages/activities/dashboard/ActivityListItemAttendees.component";
import {observer} from "mobx-react-lite";

type IProps = {
    activity: IActivity;
    target: string;
    submitting: boolean;
    handleView: (activityId: string) => void;
    deleteActivity: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
}

const ActivityDashboardItem: React.FC<IProps> = ({activity, submitting, target, deleteActivity, handleView}) => {
    const {date, category, city, description, title, venue, id, attendees, isGoing, isHost} = activity;
    const host=attendees.filter(a=>a.isHost)[0];
    return (
        <Segment.Group>
            <Segment>
                <Label attached={"top"}>
                    <Icon name={'clock'}/> {format(date!, 'h:mm a')}
                    <Icon name={'marker'} style={{marginLeft: '1rem'}}/> {venue}, {city}
                </Label>

                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={`/assets/user.png`}/>
                        <Item.Content>
                            <Item.Header as='a'>{title}</Item.Header>
                            <Item.Description>
                                {
                                    isHost && <Label tag style={{marginBottom: '1rem'}} color={'orange'}
                                                     content={'You are hosting this activity'}/>
                                }
                                {
                                    isGoing && !isHost && <Label tag style={{marginBottom: '1rem'}} color={'green'}
                                                                 content={'You are going to this activity'}/>
                                }


                            </Item.Description>
                            <Label basic content={category}/>
                        </Item.Content>

                    </Item>
                </Item.Group>

                <Segment secondary>
                    <ActivityListItemAttendees attendees={attendees}/>
                </Segment>

                <Segment clearing>
                    <span>{description}</span>
                    <Button.Group floated={"right"}>
                        <Button animated basic positive onClick={() => handleView(id)}>
                            <Button.Content hidden>View</Button.Content>
                            <Button.Content visible>
                                <Icon name={'eye'}/>
                            </Button.Content>
                        </Button>
                        <Button.Or/>
                        <Button animated basic
                                loading={target === id && submitting}
                                negative
                                name={id}
                                onClick={(e, ...menuParams) => deleteActivity(id, e)}>
                            <Button.Content hidden>Delete</Button.Content>
                            <Button.Content visible>
                                <Icon name={'trash alternate'}/>
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </Segment>
            </Segment>
        </Segment.Group>
    )
};

export default observer(ActivityDashboardItem);
