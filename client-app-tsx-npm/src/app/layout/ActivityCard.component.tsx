import React from 'react'
import {Card, Image, Button, Icon, Form} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    selectedActivity: IActivity;
    editMode: boolean;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityCard: React.FC<IProps> = ({
                                            selectedActivity,
                                            editMode,
                                            setEditMode,
                                            setSelectedActivity
                                        }) => {
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

                <Button.Group>
                    <Button animated basic positive type={'button'}
                            onClick={() => setEditMode(!editMode)}>
                        <Button.Content hidden>Edit</Button.Content>
                        <Button.Content visible>
                            <Icon name={'edit'}/>
                        </Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button animated type={'button'} basic negative
                            onClick={() => setSelectedActivity(null)}>
                        <Button.Content hidden>Cancel</Button.Content>
                        <Button.Content visible>
                            <Icon name={'cancel'}/>
                        </Button.Content>
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
};

export default ActivityCard
