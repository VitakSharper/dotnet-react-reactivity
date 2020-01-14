import React from 'react';
import {Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Container} from "semantic-ui-react";


import NavBar from "../../features/nav/NavBar.component";
import HomePage from "../../features/home/HomePage";
import ActivityDashboard from "../../features/activities/dashboard/AcivityDashboard";
import ActivityDetails from "../../features/activities/dashboard/ActivityDetails.component";
import ActivityFormModal from "../../features/nav/ActivityFormModal.component";

const App: React.FC<RouteComponentProps> = ({location}) => {

    return (
        <>
            <NavBar/>
            <Container>
                <Switch>
                    <Route exact path={'/'} component={HomePage}/>
                    <Route exact path={'/activities'} component={ActivityDashboard}/>
                    <Route path={'/activities/:id'} component={ActivityDetails}/>
                    <Route key={location.key} path={['/createActivity', '/manageActivity/:id']}
                           component={ActivityFormModal}/>
                </Switch>
            </Container>
        </>
    );
};

export default withRouter(observer(App));
