import React, {useState} from "react";
import {v4 as uuid} from 'uuid';

import {Form, Segment, Button} from "semantic-ui-react";

import {connect} from 'react-redux';
import {createStructuredSelector} from "reselect";
import {setEditMode, editExistingActivity, addActivity} from "../../app/redux/activities/activity.actions";
import {selectEditMode} from "../../app/redux/activities/activity.selectors";

const ActivityForm = ({activity, setEditMode, editMode, setOpen, editExistingActivity, addActivity}) => {

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
        !editMode && addActivity({id: uuid(), ...initActivity});
        setOpen && setOpen(false);
        // if (createMode) handleCreateActivity({id: uuid(), ...initActivity});
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInitActivity({...initActivity, [name]: value});
    };

    const handleCancel = () => {
        setEditMode(false);
        setOpen && setOpen(false);
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
                        onClick={() => handleCancel()}
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
    setEditMode: (mode) => dispatch(setEditMode(mode)),
    editExistingActivity: (activity) => dispatch(editExistingActivity(activity)),
    addActivity: (activity) => dispatch(addActivity(activity))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivityForm);
