import React, {FormEvent, useContext, useState} from "react";
import {Form, Segment, Button, Icon} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';
import Activities from "../../../app/api/agent";
import activityStore from "../../../app/store/Activity.store";
import {observer} from "mobx-react-lite";

type IProps = {
    activity?: IActivity | null;
}

const ActivityForm: React.FC<IProps> = ({activity}) => {
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
    const ActivityStore = useContext(activityStore);
    const {setEditMode, editMode, submitting, setCreateMode, createMode, editActivity,createActivity} = ActivityStore;

    const handleSubmit = () => {
        if (editMode && activity) {
            editActivity({id: activity?.id, ...initActivity});
        }
        if (createMode) {
          createActivity({id: uuid(), ...initActivity})
        }
    };

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
        setInitActivity({...initActivity, [name]: value});
    };

    const handleCancel = () => {
        setEditMode(false);
        setCreateMode(false);
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
