import React, {useContext} from "react";
import {Form as FinalForm, Field} from "react-final-form";
import {combineValidators, isRequired} from "revalidate";
import {Form, Header, Button, Icon} from "semantic-ui-react";

import {RootStoreContext} from "../../store/Root.store";

import ErrorMessage from "./ErrorMessage.component";
import {FORM_ERROR} from "final-form";

import TextInput from "./reusable/TextInput.component";
import TextAreaInput from "./reusable/TextAreaInput.component";
import {IProfile} from "../../models/profile";

const validate = combineValidators({
    displayName: isRequired('displayName'),
});

const ProfileForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, Edit} = rootStore.profileStore;
    const {modalState} = rootStore.modalStore;

    return (
        <FinalForm
            onSubmit={(values: Partial<IProfile>) => Edit(values)
                // get errors from response;
                .catch(err => ({
                    [FORM_ERROR]: err
                }))}
            validate={validate}
            initialValues={profile!}
            render={({handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit} style={{paddingBottom: '3rem'}} error>
                    <Header
                        as={'h2'}
                        content={`Edit profile ${profile?.displayName}`}
                        color={'teal'}
                        textAlign={"center"}/>

                    <Field
                        name={'displayName'}
                        component={TextInput}
                        placeholder={'Display Name'}
                    />

                    <Field
                        name={'bio'}
                        component={TextAreaInput}
                        placeholder={'User Bio'}
                    />
                    {
                        submitError
                        && !dirtySinceLastSubmit
                        && <ErrorMessage error={submitError} text={'Invalid display name.'}/>
                    }
                    <Button.Group floated={"right"} fluid>
                        <Button animated basic positive
                                loading={submitting}
                                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                                type={'submit'}>
                            <Button.Content hidden>Save</Button.Content>
                            <Button.Content visible>
                                <Icon name={'check'}/>
                            </Button.Content>
                        </Button>
                        <Button.Or/>
                        <Button animated
                                type={'button'} basic negative
                                onClick={() => modalState(null, false)}>
                            <Button.Content hidden>Cancel</Button.Content>
                            <Button.Content visible>
                                <Icon name={'cancel'}/>
                            </Button.Content>
                        </Button>
                    </Button.Group>
                    {/*<pre>{JSON.stringify(form.getState(), null, 2)}</pre>*/}
                </Form>
            )}
        />
    )
};

export default ProfileForm;
