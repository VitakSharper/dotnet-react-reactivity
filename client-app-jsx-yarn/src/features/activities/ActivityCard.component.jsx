import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

import {connect} from 'react-redux';
import {setSelectedActivity} from "../../app/redux/activities/activity.actions";
import {setEditMode} from "../../app/redux/activities/activity.actions";

const ActivityCard = ({selectedActivity, setSelectedActivity, setEditMode}) => {
    const {title, date, description, category} = selectedActivity;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span>{date}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group floated={"left"}>
                    <Button color={"blue"} basic content={'Edit'} onClick={() => setEditMode(true)}/>
                    <Button.Or/>
                    <Button color={"grey"} basic content={'Cancel'} onClick={() => setSelectedActivity(null)}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
};

const mapDispatchToProps = dispatch => ({
    setSelectedActivity: (activityId) => dispatch(setSelectedActivity(activityId)),
    setEditMode: (mode) => dispatch(setEditMode(mode))
});

export default connect(null, mapDispatchToProps)(ActivityCard)
