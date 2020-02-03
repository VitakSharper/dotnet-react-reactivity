import React, {useContext} from "react";
import {Form as FinalForm, Field} from "react-final-form";
import {Link} from "react-router-dom";
import {Button, Form, Icon, Label} from "semantic-ui-react";
import TextInput from "./reusable/TextInput.component";
import {RootStoreContext} from "../../store/Root.store";
import {IUserFormValues} from "../../models/user";
import {FORM_ERROR} from "final-form";
import {combineValidators, isRequired} from "revalidate";

const validate = combineValidators({
    email: isRequired('email'),
    password: isRequired('password')
});

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
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
                <Form onSubmit={handleSubmit}>

                    <Field name={'email'}
                           component={TextInput}
                           placeholder={'Email'}
                    />

                    <Field name={'password'}
                           component={TextInput}
                           placeholder={'Password'}
                           type={'password'}
                    />
                    {submitError && !dirtySinceLastSubmit &&
                    < Label color={'red'} basic content={submitError.statusText}/>}
                    <Button.Group floated={"right"}>
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
                        <Button animated type={'button'} basic negative as={Link} to="/">
                            <Button.Content hidden>Cancel</Button.Content>
                            <Button.Content visible>
                                <Icon name={'cancel'}/>
                            </Button.Content>
                        </Button>
                    </Button.Group>
                    <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
                </Form>
            )}
        />
    )
};

export default LoginForm;
