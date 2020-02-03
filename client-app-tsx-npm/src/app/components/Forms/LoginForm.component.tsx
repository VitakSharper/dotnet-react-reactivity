import React from "react";
import {Form as FinalForm, Field} from "react-final-form";
import {Button, Form, Icon} from "semantic-ui-react";
import TextInput from "./reusable/TextInput.component";

const LoginForm = () => {
    return (
        <FinalForm
            onSubmit={(values) => console.log(values)}
            render={({handleSubmit}) => (
                <Form onSubmit={handleSubmit}>

                    <Field name={'email'}
                           component={TextInput}
                           placeholder={'Email'}/>

                    <Field name={'password'}
                           component={TextInput}
                           placeholder={'Password'}
                           type={'password'}
                    />
                    <Button.Group floated={"right"}>
                        <Button animated basic positive
                            // loading={submitting}
                            // disabled={loading || invalid || pristine}
                                type={'submit'}>
                            <Button.Content hidden>Login</Button.Content>
                            <Button.Content visible>
                                <Icon name={'sign-in'}/>
                            </Button.Content>
                        </Button>
                        <Button.Or/>
                        <Button animated type={'button'} basic negative>
                            <Button.Content hidden>Cancel</Button.Content>
                            <Button.Content visible>
                                <Icon name={'cancel'}/>
                            </Button.Content>
                        </Button>
                    </Button.Group>
                </Form>
            )}
        />
    )
};

export default LoginForm;
