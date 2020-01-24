import React from "react";
import {Field} from "react-final-form";

import {Form} from "semantic-ui-react";

import TextInput from "./reusable/TextInput.component";
import TextareaAutosize from "react-textarea-autosize";
import TextAreaInput from "./reusable/TextAreaInput.component";
import {IActivityFormValues} from "../../models/activity";
import SelectInput from "./reusable/SelectInput.component";
import {category} from "./reusable/selectOptions/categoryOptions";
import DateInput from "./reusable/DateInput.component";

interface IProps {
    initForm: IActivityFormValues
}

const ActivityFormInputs: React.FC<IProps> = ({initForm}) => {
    return (
        <>
            <Field
                placeholder='Title'
                value={initForm.title}
                name={'title'}
                component={TextInput}
            />
            <Field
                name={'description'}
                placeholder='Description'
                value={initForm!.description}
                useCacheForDOMMeasurements
                control={TextareaAutosize}
                component={TextAreaInput}
            />
            <Field
                label='Category'
                name={'category'}
                placeholder='Category'
                value={initForm.category}
                options={category}
                component={SelectInput}
            />
            <Field
                label='Venue'
                name={'venue'}
                placeholder='Venue'
                value={initForm.venue}
                component={TextInput}
            />
            <Field
                label='City'
                name={'city'}
                placeholder='City'
                value={initForm.city}
                component={TextInput}
            />
            <Form.Group widths={'equal'}>
                <Field
                    name={'date'}
                    placeholder='Date'
                    date={true}
                    value={initForm.date}
                    component={DateInput}
                />
                <Field
                    name={'time'}
                    placeholder='Time'
                    time={true}
                    value={initForm.time}
                    component={DateInput}
                />
            </Form.Group>

        </>
    )
};

export default ActivityFormInputs;
