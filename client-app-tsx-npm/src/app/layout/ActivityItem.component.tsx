import React from 'react'
import {Item, Button, Label} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    activity: IActivity;
    selectActivity: (id: string) => void;
    handleDeleteActivity: (id: string) => void;

}


const ActivityItem: React.FC<IProps> = ({activity, selectActivity, handleDeleteActivity}) => (
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
                    <Button
                        basic
                        color='blue'
                        floated={"right"}
                        content={'View'}
                        size={"mini"}
                        onClick={() => selectActivity(activity.id)}
                    />
                    <Button.Or/>
                    <Button basic negative onClick={() => handleDeleteActivity(activity.id)}>Delete</Button>
                </Button.Group>
                <Label basic content={activity.category}/>
            </Item.Extra>
        </Item.Content>
    </Item>
);

export default ActivityItem
