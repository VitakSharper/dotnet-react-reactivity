import React, {useContext, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

import {Form, Segment, Grid, Button, Icon} from "semantic-ui-react";
import {Form as FinalForm, Field} from 'react-final-form';

import activityStore from "../../store/Activity.store";
import {IActivity} from "../../models/activity";
import {observer} from "mobx-react-lite";
import ActivityFormInputs from "./ActivityFormInputs.component";

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

    // return (({id, ...o}) => o)(selectedActivity) // return object elements without id ;

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

    // const handleSubmit = async () => {
    //     if (editMode && activity) {
    //         await editActivity({id: activity?.id, ...initForm});
    //     } else {
    //         const id = uuid();
    //         await createActivity({...initForm, id}).then(() => closeForm(`/activities/${id}`));
    //     }
    // };

    // const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const {name, value} = e.currentTarget;
    //     setInitForm({...initForm, [name]: value});
    // };

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

    const handleFinalFormSubmit = (values: any) => {
        console.log('Final Form: ', values)
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit}) => (
                            <Form onSubmit={handleSubmit}>

                                <ActivityFormInputs initForm={initForm}/>

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
                        )}/>
                </Segment>
            </Grid.Column>
        </Grid>
    )
};

export default observer(ActivityForm);
