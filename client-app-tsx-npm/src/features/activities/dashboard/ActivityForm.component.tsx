import React, {FormEvent, useState} from "react";
import {Form, Segment, Button} from "semantic-ui-react";
import {IActivity} from "../../../app/models/activity";
import {v4 as uuid} from 'uuid';

type IProps = {
    activity?: IActivity | null;
    editMode: boolean;
    createMode?: boolean;
    setEditMode: (editMode: boolean) => void;
    handleCreateActivity: (activity: IActivity) => void;
    handleEditActivity?: (activity: IActivity) => void;
}


const ActivityForm: React.FC<IProps> = ({
                                            editMode,
                                            setEditMode,
                                            createMode,
                                            activity,
                                            handleCreateActivity,
                                            handleEditActivity
                                        }) => {
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
        if (editMode && activity && handleEditActivity) {
            handleEditActivity({id: activity?.id, ...initActivity});
        }
        if (createMode) handleCreateActivity({id: uuid(), ...initActivity});
    };

    const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.currentTarget;
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
                        onClick={() => setEditMode(!editMode)}
                    />
                    <Button.Or/>
                    <Button basic positive type={'submit'} content={'Submit'}/>
                </Button.Group>
            </Form>
        </Segment>
    )
};

export default ActivityForm;
