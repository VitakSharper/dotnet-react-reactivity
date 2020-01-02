import React from 'react';
import {Route, Switch} from 'react-router-dom';

import NavBar from "../../features/nav/NavBar.component";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/AcivityDashboard";

const App = () => {

    return (
        <>
            <NavBar/>
            <Switch>
                <Route path={'/'} exact component={HomePage}/>
                <Route path={'/activities'} component={ActivityDashboard}/>
            </Switch>
        </>
    );
};

export default App;
