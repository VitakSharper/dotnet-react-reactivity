import React from 'react'
import {Card, Image, Button} from 'semantic-ui-react'

const ActivityCard = ({selectedActivity: {title, date, description, category}}) => {
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
                    <Button color={"blue"} basic content={'Edit'}/>
                    <Button color={"grey"} basic content={'Cancel'}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
};

export default ActivityCard
