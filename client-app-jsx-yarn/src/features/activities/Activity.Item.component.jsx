import React from 'react'
import {Item, Button, Label} from 'semantic-ui-react'

import {connect} from 'react-redux';
import {setSelectedActivity} from "../../app/redux/activities/activity.actions";

const ActivityItem = ({activity, setSelectedActivity}) => {
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
                        onClick={() => setSelectedActivity(id)}
                    />
                    <Label basic content={category}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
};

const mapDispatchToProps = dispatch => ({
    setSelectedActivity: (activityId) => dispatch(setSelectedActivity(activityId)),
});

export default connect(null, mapDispatchToProps)(ActivityItem)
