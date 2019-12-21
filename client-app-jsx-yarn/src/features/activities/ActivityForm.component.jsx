import React from "react";
import {Form, Segment} from "semantic-ui-react";

const ActivityForm = () => {

    return (
        <Segment>
            <Form>
                <Form.Input label='Title' placeholder='Title'/>
                <Form.TextArea rows={2} label='Description' placeholder='Description'/>
                <Form.Input label='Category' placeholder='Category'/>
                <Form.Input label='Venue' placeholder='Venue'/>
                <Form.Input label='City' placeholder='City'/>
                <Form.Input type={'date'} label='Date' placeholder='Date'/>

            </Form>
        </Segment>
    )
};

export default ActivityForm;
