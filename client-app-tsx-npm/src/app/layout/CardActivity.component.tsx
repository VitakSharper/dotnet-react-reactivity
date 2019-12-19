import React from 'react'
import {Card, Icon} from 'semantic-ui-react'
import {IActivity} from "../models/activity";

type IProps = {
    activity: IActivity
}

const CardActivity: React.FC<IProps> = ({activity}) => (
    <Card>
        <Card.Content header={activity.title}/>
        <Card.Content description={activity.description}/>
        <Card.Content extra>
            <Icon name='user'/>4 Friends
        </Card.Content>
    </Card>
);

export default CardActivity
