import React, {useContext} from "react";
import {RootStoreContext} from "../../store/Root.store";
import {Field, Form as FinalForm} from "react-final-form";
import {IUserFormValues} from "../../models/user";
import {FORM_ERROR} from "final-form";
import {Button, Form, Header, Icon} from "semantic-ui-react";
import TextInput from "./reusable/TextInput.component";
import ErrorMessage from "./ErrorMessage.component";
import {observer} from "mobx-react-lite";

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {modalState} = rootStore.modalStore;
    const {Register} = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => Register(values)
                // get errors from response;
                .catch(err => ({
                    [FORM_ERROR]: err
                }))}
            render={({
                         handleSubmit,
                         submitting, form,
                         submitError,
                         invalid,
                         pristine,
                         dirtySinceLastSubmit
                     }) => (
                <Form onSubmit={handleSubmit} style={{paddingBottom: '3rem'}} error>
                    <Header
                        as={'h2'}
                        content={'Sign up a new account'}
                        color={'teal'} textAlign={"center"}/>

                    <Field name={'username'}
                           component={TextInput}
                           placeholder={'Username'}
                    />

                    <Field name={'displayName'}
                           component={TextInput}
                           placeholder={'Display Name'}
                    />

                    <Field name={'email'}
                           component={TextInput}
                           placeholder={'Email'}
                    />
                    <Field name={'password'}
                           component={TextInput}
                           placeholder={'Password'}
                           type={'password'}
                    />
                    {
                        submitError
                        && !dirtySinceLastSubmit
                        && <ErrorMessage
                            error={submitError}
                        />
                    }
                    <Button.Group floated={"right"} fluid>
                        <Button animated basic positive
                                loading={submitting}
                                disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                                type={'submit'}>
                            <Button.Content hidden>Register</Button.Content>
                            <Button.Content visible>
                                <Icon name={'edit'}/>
                            </Button.Content>
                        </Button>
                        <Button.Or/>
                        <Button animated type={'button'} basic negative onClick={() => modalState(null, false)}>
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

export default observer(RegisterForm)
