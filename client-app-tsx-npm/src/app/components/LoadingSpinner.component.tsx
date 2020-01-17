import React from 'react'
import {Dimmer, Loader, Segment} from 'semantic-ui-react'

const LoadingSpinner:React.FC<{inverted?:boolean,content?:string}> = ({inverted, content}) => (
    <Segment>
        <Dimmer active inverted={inverted}>
            <Loader content={content}/>
        </Dimmer>
    </Segment>
);

export default LoadingSpinner
