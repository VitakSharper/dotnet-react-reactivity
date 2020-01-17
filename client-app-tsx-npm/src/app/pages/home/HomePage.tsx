import React from "react";
import {Link} from "react-router-dom";
import {Segment} from "semantic-ui-react";


const HomePage = () => {
    return (
        <Segment>
            <h3>Go to <Link to={'/activities'}>Activities</Link></h3>
        </Segment>
    )
};

export default HomePage;
