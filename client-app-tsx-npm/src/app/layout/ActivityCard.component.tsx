import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    selectedActivity: IActivity;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityCard: React.FC<IProps> = ({selectedActivity, editMode, setEditMode, setSelectedActivity}) => {
    const {title, date, description, category} = selectedActivity;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Meta>
                    <span>{date}</span>
                </Card.Meta>
                <Card.Description>
                    {description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button
                        color={"blue"}
                        basic content={'Edit'}
                        onClick={() => setEditMode(!editMode)}
                    />
                    <Button
                        color={"grey"}
                        basic content={'Cancel'}
                        onClick={() => setSelectedActivity(null)}
                    />
                </Button.Group>
            </Card.Content>
        </Card>
    )
};

export default ActivityCard
