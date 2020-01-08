import React, {SyntheticEvent} from 'react'
import {Item, Button, Label, Icon} from 'semantic-ui-react'
import {IActivity} from "../models/activity";
import {observer} from "mobx-react-lite";

type IProps = {
    activity: IActivity;
    selectActivity: (id: string) => void;
    handleDeleteActivity: (id: string, e: SyntheticEvent<HTMLButtonElement>) => void;
    target: string;
    submitting: boolean;

}

const ActivityItem: React.FC<IProps> = ({activity, selectActivity, handleDeleteActivity, submitting, target}) => (
    <Item>
        <Item.Image size='tiny' src={`/assets/categoryImages/${activity.category}.jpg`}/>
        <Item.Content>
            <Item.Header as='a'>{activity.title}</Item.Header>
            <Item.Meta>{activity.date}</Item.Meta>
            <Item.Description>
                <div>{activity.description}</div>
                <div>{activity.city}, {activity.venue}</div>
            </Item.Description>
            <Item.Extra>
                <Button.Group floated={"right"}>
                    <Button animated basic positive onClick={() => selectActivity(activity.id)}>
                        <Button.Content hidden>View</Button.Content>
                        <Button.Content visible>
                            <Icon name={'eye'}/>
                        </Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button animated basic
                            loading={target === activity.id && submitting}
                            negative
                            name={activity?.id}
                            onClick={(e, ...menuParams) => handleDeleteActivity(activity.id, e)}>
                        <Button.Content hidden>Delete</Button.Content>
                        <Button.Content visible>
                            <Icon name={'trash alternate'}/>
                        </Button.Content>
                    </Button>
                </Button.Group>
                <Label basic content={activity.category}/>
            </Item.Extra>
        </Item.Content>
    </Item>
);

export default ActivityItem
