import React from 'react';
import {Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Container} from "semantic-ui-react";


import NavBar from "./pages/nav/NavBar.component";
import HomePage from "./pages/home/HomePage";
import ActivityDashboard from "./pages/activities/dashboard/AcivityDashboard.page";
import ActivityDetails from "./pages/activities/activityDetail/ActivityDetails.page";
import ActivityFormModal from "./components/ActivityFormModal.component";

const App: React.FC<RouteComponentProps> = ({location}) => {

    return (<>
        <Route exact path={'/'} component={HomePage}/>
        <Route path={'/(.+)'} render={() => (
            <>
                <NavBar/>
                <Container>
                    <Switch>
                        <Route exact path={'/activities'} component={ActivityDashboard}/>
                        <Route path={'/activities/:id'} component={ActivityDetails}/>
                        <Route key={location.key} path={['/createActivity', '/manageActivity/:id']}
                               component={ActivityFormModal}/>
                    </Switch>
                </Container>
            </>
        )}/>
    </>)
};

export default withRouter(observer(App));