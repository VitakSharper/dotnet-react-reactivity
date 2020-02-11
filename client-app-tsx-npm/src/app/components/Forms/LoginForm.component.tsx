import React, {useContext} from "react";
import {Form as FinalForm, Field} from "react-final-form";
import {Form, Header, Button, Icon} from "semantic-ui-react";
import TextInput from "./reusable/TextInput.component";
import {RootStoreContext} from "../../store/Root.store";
import {IUserFormValues} from "../../models/user";
import ErrorMessage from "./ErrorMessage.component";
import {FORM_ERROR} from "final-form";
import {combineValidators, isRequired} from "revalidate";

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const {modalState} = rootStore.modalStore;
    const {login} = rootStore.userStore;

    return (
        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values)
                // get errors from response;
                .catch(err => ({
                    [FORM_ERROR]: err
                }))}
            validate={validate}
            render={({handleSubmit, submitting, form, submitError, invalid, pristine, dirtySinceLastSubmit}) => (
                <Form onSubmit={handleSubmit} style={{paddingBottom: '3rem'}} error>
                    <Header
                        as={'h2'}
                        content={'Sign In'}
                        color={'teal'} textAlign={"center"}/>
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
                        && <ErrorMessage error={submitError} text={'Invalid username or password.'}/>
                    }
                    <Button.Group floated={"right"} fluid>
                        <Button animated basic positive
                                loading={submitting}
                                disabled={invalid && !dirtySinceLastSubmit || pristine}
                                type={'submit'}>
                            <Button.Content hidden>Login</Button.Content>
                            <Button.Content visible>
                                <Icon name={'sign-in'}/>
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

export default LoginForm;
