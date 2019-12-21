import React from 'react';
import {Switch, Route} from 'react-router-dom';

import NavBar from "../../features/nav/Navbar.component";
import HomePage from "../../features/home/HomePage.component";
import ActivityDashboard from "../../features/activities/ActivityDashboard.component";

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
