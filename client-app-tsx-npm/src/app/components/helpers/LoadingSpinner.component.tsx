import React from 'react'
import {Dimmer, Loader} from 'semantic-ui-react'

const LoadingSpinner: React.FC<{ inverted?: boolean, content?: string }> = ({inverted, content}) => (
    <Dimmer active inverted={inverted}>
        <Loader content={content}/>
    </Dimmer>
);

export default LoadingSpinner
