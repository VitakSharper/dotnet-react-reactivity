import React from "react";
import {Link} from "react-router-dom";

import {Segment, Header, Icon, Button, Image} from "semantic-ui-react";

const NotFound = () => {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name={'search'}/> Oops - we've looked everywhere but couldn't find this.
            </Header>
            <Segment.Inline>

                <Image src={'https://i.imgur.com/DWO5Hzg.png'} fluid style={{maxWidth: '20rem', maxHeight: '20rem'}}/>
            </Segment.Inline>

            <Segment.Inline>
                <Button as={Link} to={'/activities'} primary>
                    Return to Activities page
                </Button>
            </Segment.Inline>
        </Segment>
    )
};

export default NotFound;
