import React, {FormEvent, useContext, useState, useEffect} from "react";
import {Form, Segment, Button, Icon} from "semantic-ui-react";
import {useHistory} from 'react-router-dom';
import {v4 as uuid} from 'uuid';


import activityStore from "../../../app/store/Activity.store";
import {IActivity} from "../../../app/models/activity";
import {observer} from "mobx-react-lite";

type IProps = {
    activityId: string | null
}

const ActivityForm: React.FC<IProps> = ({activityId}) => {
    const ActivityStore = useContext(activityStore);
    const {
        editMode,
        submitting,
        setOpenForm,
        editActivity,
        createActivity,
        loadActivity,
        activity,
        setSelectedActivityNull
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

    const [initActivity, setInitActivity] = useState<IActivity>({
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
        if (activityId) {
            loadActivity(activityId).then(() => {
                activity && setInitActivity(activity)
            });
        }
        return () => {
            setSelectedActivityNull()
        }
    }, [loadActivity, setSelectedActivityNull, activityId, activity]);

    const handleSubmit = async () => {
        if (editMode && activity) {
            await editActivity({id: activity?.id, ...initActivity});
        } else {
            await createActivity({...initActivity, id: uuid()}).then(() => closeForm('/activities'));
        }
    };

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setInitActivity({...initActivity, [name]: value});
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
