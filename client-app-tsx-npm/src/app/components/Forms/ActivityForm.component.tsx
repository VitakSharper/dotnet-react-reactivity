import React, {useContext, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

import {Form, Segment, Grid, Button, Icon} from "semantic-ui-react";
import {Form as FinalForm} from 'react-final-form';

import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate';

import {ActivityFormValues} from "../../models/activity";
import {observer} from "mobx-react-lite";
import ActivityFormInputs from "./ActivityFormInputs.component";
import {combineDateAndTime} from "./util";
import {RootStoreContext} from "../../store/Root.store";


const validate = combineValidators({
    title: isRequired({message: 'The title is required.'}),
    category: isRequired({message: 'The category is required.'}),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters.'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
});

const ActivityForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {
        activityStore: {
            editMode,
            submitting,
            setOpenForm,
            editActivity,
            createActivity,
            loading,
            activity,
            setActivityNull
        }
    } = rootStore;

    // return (({id, ...o}) => o)(selectedActivity) // return object elements without id ;

    const [initForm, setInitForm] = useState(new ActivityFormValues());

    const history = useHistory();

    useEffect(() => {
        activity && setInitForm(new ActivityFormValues(activity));
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

    const closeForm = (url?: string) => {
        setOpenForm(false);
        url && history.push(url)
    };

    const handleFinalFormSubmit = async (values: any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        const activity = (({date, time, ...activity}) => ({...activity, date: dateAndTime}))(values);

        if (editMode && activity) {
            await editActivity(activity).then(() => closeForm());
        } else {
            const id = uuid();
            await createActivity({...activity, id}).then(() => closeForm());
        }
    };

    return (
        <Grid>
            <Grid.Column width={10}>
                <Segment clearing>
                    <FinalForm
                        initialValues={initForm}
                        validate={validate}
                        onSubmit={handleFinalFormSubmit}
                        render={({handleSubmit, invalid, pristine}) => (
                            <Form onSubmit={handleSubmit}>
                                <ActivityFormInputs initForm={initForm}/>
                                <Button.Group floated={"right"}>
                                    <Button animated basic positive
                                            loading={submitting}
                                            disabled={loading || invalid || pristine}
                                            type={'submit'}>
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
