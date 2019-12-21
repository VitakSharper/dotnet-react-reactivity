import React from 'react'
import {Item, Button, Label} from 'semantic-ui-react'

const ActivityItem = ({activity, selectActivity}) => {
    const {id, venue, category, date, city, title, description} = activity;

    return (
        <Item>
            <Item.Image size='tiny' src={`/assets/categoryImages/${category}.jpg`}/>
            <Item.Content>
                <Item.Header as='a'>{title}</Item.Header>
                <Item.Meta>{date}</Item.Meta>
                <Item.Description>
                    <div>{description}</div>
                    <div>{city}, {venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        basic
                        color='blue'
                        floated={"right"}
                        content={'View'}
                        size={"mini"}
                        onClick={() => selectActivity(id)}
                    />
                    <Label basic content={category}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
};

export default ActivityItem
