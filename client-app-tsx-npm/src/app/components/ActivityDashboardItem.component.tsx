import React, {SyntheticEvent} from 'react'
import {Item, Button, Label, Icon, Segment} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    activity: IActivity;
    target: string;
    submitting: boolean;
    handleView: (activityId: string) => void;
    deleteActivity: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
}

const ActivityDashboardItem: React.FC<IProps> = ({activity, submitting, target, deleteActivity, handleView}) => {
    const {date, category, city, description, title, venue, id} = activity;
    return (
        <Segment.Group>
            <Segment>
                <Label attached={"top"}>
                    <Icon name={'clock'}/> {activity.date}
                    <Icon name={'marker'}/> {activity.venue}, {activity.city}
                </Label>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={`/assets/user.png`}/>
                        <Item.Content>
                            <Item.Header as='a'>{title}</Item.Header>
                            <Item.Description>
                                Hosted by Him
                            </Item.Description>
                            <Label basic content={category}/>
                        </Item.Content>

                    </Item>
                </Item.Group>

                <Segment secondary>
                    Attendees will go here
                </Segment>
                <Segment clearing>
                    <span>{activity.description}</span>
                    <Button.Group floated={"right"}>
                        <Button animated basic positive onClick={() => handleView(activity.id)}>
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

export default ActivityDashboardItem;
