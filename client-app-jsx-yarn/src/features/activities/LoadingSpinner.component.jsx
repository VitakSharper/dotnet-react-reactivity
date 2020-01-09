import React from 'react'
import {Dimmer, Loader, Segment} from 'semantic-ui-react'

const LoadingSpinner = ({inverted, content}) => (
    <Segment>
        <Dimmer active inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    </Segment>
);

export default LoadingSpinner
