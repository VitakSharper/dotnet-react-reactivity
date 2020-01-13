import React from 'react'
import {Link} from "react-router-dom";

import {Card, Image, Button, Icon} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    selectedActivity: IActivity | undefined;
    handleModalForm: () => void;
}

const ActivityCard: React.FC<IProps> = ({
                                            selectedActivity, handleModalForm
                                        }) => {

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity?.category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{selectedActivity?.title}</Card.Header>
                <Card.Meta>
                    <span>{selectedActivity?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {selectedActivity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>

                <Button.Group>
                    <Button animated basic positive type={'button'}
                            onClick={handleModalForm}>
                        <Button.Content hidden>Edit</Button.Content>
                        <Button.Content visible>
                            <Icon name={'edit'}/>
                        </Button.Content>
                    </Button>
                    <Button.Or/>
                    <Button animated type={'button'} basic negative
                            as={Link} to={'/activities'}>
                        <Button.Content hidden>Cancel</Button.Content>
                        <Button.Content visible>
                            <Icon name={'cancel'}/>
                        </Button.Content>
                    </Button>
                </Button.Group>
            </Card.Content>
        </Card>)
};

export default ActivityCard
