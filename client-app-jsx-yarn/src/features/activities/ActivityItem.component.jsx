import React from 'react'
import {Item, Button, Label, Icon} from 'semantic-ui-react'

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'
import {removeExistingActivityStart, setSelectedActivity} from "../../app/redux/activities/activity.actions";
import {setEditMode} from "../../app/redux/activities/activity.actions";
import {selectBtnTarget} from "../../app/redux/activities/activity.selectors";

const ActivityItem = ({activity, setSelectedActivity, setEditMode, removeExistingActivity, btnTarget}) => {
    const {id, venue, category, date, city, title, description} = activity;

    const handleViewActivity = () => {
        setEditMode(false);
        setSelectedActivity(id);
    };

    const handleRemoveActivity = () => {
        removeExistingActivity(id);
        setSelectedActivity(null);
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
                        <Button animated basic positive onClick={handleViewActivity}>
                            <Button.Content hidden>View</Button.Content>
                            <Button.Content visible>
                                <Icon name={'eye'}/>
                            </Button.Content>
                        </Button>
                        <Button.Or/>
                        <Button animated basic
                                loading={btnTarget === activity.id}
                            // loading={target === activity.id && submitting}
                                negative
                                name={activity?.id}
                                onClick={handleRemoveActivity}>
                            <Button.Content hidden>Delete</Button.Content>
                            <Button.Content visible>
                                <Icon name={'trash alternate'}/>
                            </Button.Content>
                        </Button>
                    </Button.Group>

                    <Label basic content={category}/>
                </Item.Extra>
            </Item.Content>
        </Item>)
};

const mapStateToProps = createStructuredSelector({
    btnTarget: selectBtnTarget
});

const mapDispatchToProps = dispatch => ({
    setSelectedActivity: (activityId) => dispatch(setSelectedActivity(activityId)),
    setEditMode: (mode) => dispatch(setEditMode(mode)),
    removeExistingActivity: (activityId) => dispatch(removeExistingActivityStart(activityId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityItem)
