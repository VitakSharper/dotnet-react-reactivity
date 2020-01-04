import React from 'react'
import {Item, Button, Label} from 'semantic-ui-react'

import {connect} from 'react-redux';
import {setSelectedActivity} from "../../app/redux/activities/activity.actions";
import {setEditMode} from "../../app/redux/activities/activity.actions";

const ActivityItem = ({activity, setSelectedActivity, setEditMode}) => {
    const {id, venue, category, date, city, title, description} = activity;

    const handleViewActivity = () => {
        setEditMode(false);
        setSelectedActivity(id);
    };

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
                    <Button.Group floated={"right"}>
                        <Button
                            basic
                            color='blue'
                            floated={"right"}
                            content={'View'}
                            size={"mini"}
                            onClick={handleViewActivity}
                        />
                        <Button.Or/>
                        <Button basic negative content={'Delete'}/>
                    </Button.Group>
                    <Label basic content={category}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
};

const mapDispatchToProps = dispatch => ({
    setSelectedActivity: (activityId) => dispatch(setSelectedActivity(activityId)),
    setEditMode: (mode) => dispatch(setEditMode(mode))
});

export default connect(null, mapDispatchToProps)(ActivityItem)
