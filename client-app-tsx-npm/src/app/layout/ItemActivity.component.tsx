import React from 'react'
import {Item, Button, Label} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    activity: IActivity
}

const ItemActivity: React.FC<IProps> = ({activity}) => (
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
                <Button basic color='blue' floated={"right"} content={'View'} size={"mini"}/>
                <Label basic content={activity.category}/>
            </Item.Extra>
        </Item.Content>
    </Item>
);

export default ItemActivity
