import React, {useState} from "react";

import {Form, Segment, Button} from "semantic-ui-react";

import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {setEditMode, editExistingActivity} from "../../app/redux/activities/activity.actions";
import {selectEditMode} from "../../app/redux/activities/activity.selectors";

const ActivityForm = ({activity, setEditMode, editMode, editExistingActivity}) => {

    const initForm = () => {
        if (activity) {
            return (({id, ...o}) => o)(activity)
        } else return {
            title: '',
            category: '',
            description: '',
            date: '',
            city: '',
            venue: ''
        }
    };

    const [initActivity, setInitActivity] = useState(initForm());

    const handleSubmit = () => {
        editMode && activity && editExistingActivity({id: activity?.id, ...initActivity});
        // if (createMode) handleCreateActivity({id: uuid(), ...initActivity});
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInitActivity({...initActivity, [name]: value});
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label='Title' placeholder='Title'
                    value={initActivity.title}
                    name={'title'}
                    onChange={handleChange}
                />
                <Form.TextArea
                    rows={2}
                    name={'description'}
                    label='Description'
                    placeholder='Description'
                    value={initActivity.description}
                    onChange={handleChange}
                />
                <Form.Input
                    label='Category'
                    name={'category'}
                    placeholder='Category'
                    value={initActivity.category}
                    onChange={handleChange}/>
                <Form.Input
                    label='Venue'
                    name={'venue'}
                    placeholder='Venue'
                    value={initActivity.venue}
                    onChange={handleChange}/>
                <Form.Input
                    label='City'
                    name={'city'}
                    placeholder='City'
                    value={initActivity.city}
                    onChange={handleChange}/>
                <Form.Input
                    type={'datetime-local'}
                    name={'date'}
                    label='Date'
                    placeholder='Date'
                    value={initActivity.date}
                    onChange={handleChange}/>
                <Button.Group floated={"right"}>
                    <Button
                        basic secondary
                        type={'button'}
                        content={'Cancel'}
                        onClick={() => setEditMode()}
                    />
                    <Button.Or/>
                    <Button basic positive type={'submit'} content={'Submit'}/>
                </Button.Group>
            </Form>
        </Segment>
    )
};

const mapStateToProps = createStructuredSelector(
    {editMode: selectEditMode}
);

const mapDispatchToProps = dispatch => ({
    setEditMode: () => dispatch(setEditMode()),
    editExistingActivity: (activityId) => dispatch(editExistingActivity(activityId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
