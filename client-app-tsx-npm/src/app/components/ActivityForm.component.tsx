import React, {FormEvent, useContext, useState, useEffect} from "react";
import {Form, Segment, Button, Icon} from "semantic-ui-react";
import TextareaAutosize from "react-textarea-autosize";
import {useHistory} from 'react-router-dom';
import {v4 as uuid} from 'uuid';


import activityStore from "../store/Activity.store";
import {IActivity} from "../models/activity";
import {observer} from "mobx-react-lite";


const ActivityForm = () => {
    const ActivityStore = useContext(activityStore);
    const {
        editMode,
        submitting,
        setOpenForm,
        editActivity,
        createActivity,
        activity,
        setActivityNull
    } = ActivityStore;

    // const initForm = () => {
    //     if (selectedActivity) {
    //         return (({id, ...o}) => o)(selectedActivity)
    //     } else return {
    //         title: '',
    //         category: '',
    //         description: '',
    //         date: '',
    //         city: '',
    //         venue: ''
    //     }
    // };

    const [initForm, setInitForm] = useState<IActivity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });
    const history = useHistory();

    useEffect(() => {
        activity && setInitForm(activity);
        return () => {
            setActivityNull()
        }
    }, [setActivityNull, activity]);

    const handleSubmit = async () => {
        if (editMode && activity) {
            await editActivity({id: activity?.id, ...initForm});
        } else {
            const id = uuid();
            await createActivity({...initForm, id}).then(() => closeForm(`/activities/${id}`));
        }
    };

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setInitForm({...initForm, [name]: value});
    };

    const handleCancel = () => {
        if (editMode && activity) {
            closeForm(`/activities/${activity?.id}`);
        } else {
            closeForm('/activities')
        }
    };

    const closeForm = (url: string) => {
        setOpenForm(false);
        history.push(url)
    };

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit}>
                <Form.Input
                    label='Title' placeholder='Title'
                    value={initForm.title}
                    name={'title'}
                    onChange={handleChange}
                />
                <Form.TextArea
                    control={TextareaAutosize}
                    name={'description'}
                    label='Description'
                    placeholder='Description'
                    value={initForm.description}
                    useCacheForDOMMeasurements
                    onChange={handleChange}
                />
                <Form.Input
                    label='Category'
                    name={'category'}
                    placeholder='Category'
                    value={initForm.category}
                    onChange={handleChange}/>
                <Form.Input
                    label='Venue'
                    name={'venue'}
                    placeholder='Venue'
                    value={initForm.venue}
                    onChange={handleChange}/>
                <Form.Input
                    label='City'
                    name={'city'}
                    placeholder='City'
                    value={initForm.city}
                    onChange={handleChange}/>
                <Form.Input
                    type={'datetime-local'}
                    name={'date'}
                    label='Date'
                    placeholder='Date'
                    value={initForm.date}
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
