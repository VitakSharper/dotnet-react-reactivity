import React from 'react';
import NavBar from "../../features/nav/NavBar.component";
import {Route, Switch} from 'react-router-dom';

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
