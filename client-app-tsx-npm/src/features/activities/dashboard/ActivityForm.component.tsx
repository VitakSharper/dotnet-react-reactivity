import React, {FormEvent, useContext, useState} from "react";
import {Form, Segment, Button, Icon} from "semantic-ui-react";
import {v4 as uuid} from 'uuid';
import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";

const ActivityForm = () => {
    const ActivityStore = useContext(activityStore);
    const {
        setEditMode,
        editMode,
        submitting,
        setOpenForm,
        editActivity,
        createActivity,
        selectedActivity
    } = ActivityStore;

    const initForm = () => {
        if (selectedActivity) {
            return (({id, ...o}) => o)(selectedActivity)
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

    const handleSubmit = async () => {
        if (editMode && selectedActivity) {
            await editActivity({id: selectedActivity?.id, ...initActivity});
        }
        if (!editMode) {
            await createActivity({id: uuid(), ...initActivity});
            setOpenForm(false);
        }
    };

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setInitActivity({...initActivity, [name]: value});
    };

    const handleCancel = () => {
        setEditMode(false);
        setOpenForm(false);
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
                    <Button animated basic positive loading={submitting} type={'submit'}>
                        <Button.Content hidden>Submit</Button.Content>
                        <Button.Content visible>
                            <Icon name={'send'}/>
                        </Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button animated type={'button'} basic negative onClick={handleCancel}>
                        <Button.Content hidden>Cancel</Button.Content>
                        <Button.Content visible>
                            <Icon name={'cancel'}/>
                        </Button.Content>
                    </Button>
                </Button.Group>
            </Form>
        </Segment>)
};

export default observer(ActivityForm);
