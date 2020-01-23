import React from "react";
import {Field} from "react-final-form";

import TextInput from "./reusable/TextInput.component";
import TextareaAutosize from "react-textarea-autosize";
import TextAreaInput from "./reusable/TextAreaInput.component";
import {IActivity} from "../../models/activity";
import SelectInput from "./reusable/SelectInput.component";
import {category} from "./reusable/selectOptions/categoryOptions";

interface IProps {
    initForm: IActivity
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
                value={initForm.description}
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
            <Field
                type={'datetime-local'}
                name={'date'}
                label='Date'
                placeholder='Date'
                value={initForm.date}
                component={TextInput}
            />
        </>
    )
};

export default ActivityFormInputs;
