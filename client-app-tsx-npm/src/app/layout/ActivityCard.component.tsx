import React from 'react'
import {Link} from "react-router-dom";

import {Card, Image, Button, Icon} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    activity: IActivity | undefined;
}

const ActivityCard: React.FC<IProps> = ({activity}) => {
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity?.category}.jpg`} wrapped ui={false}/>
            <Card.Content>
                <Card.Header>{activity?.title}</Card.Header>
                <Card.Meta>
                    <span>{activity?.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity?.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>

                <Button.Group>
                    <Button animated basic positive type={'button'}
                            as={Link} to={`/manageActivity/${activity?.id}`}>
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
