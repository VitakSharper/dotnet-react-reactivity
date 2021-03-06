import React, {useContext, useEffect} from 'react';
import {Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Container} from "semantic-ui-react";

import NavBar from "./pages/nav/NavBar.component";
import HomePage from "./pages/home/HomePage";
import NotFound from "./components/helpers/NotFound.component";

import ActivityDashboard from "./pages/activities/dashboard/AcivityDashboard.page";
import ActivityDetails from "./pages/activities/activityDetail/ActivityDetails.page";
import ProfilePage from "./pages/profiles/ProfilePage.component";
import ActivityFormModal from "./components/modals/ActivityFormModal.component";
import ModalContainer from "./components/modals/ModalContainer.component";

import {ToastContainer} from "react-toastify";
import {RootStoreContext} from "./store/Root.store";
import LoadingSpinner from "./components/helpers/LoadingSpinner.component";
import PrivateRoute from "./PrivateRoute.component";

const App: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
    const {getUser} = rootStore.userStore;

    useEffect(() => {
        token
            ? getUser().finally(() => setAppLoaded())
            : setAppLoaded()
    }, [setAppLoaded, token, getUser]);

    if (!appLoaded) return <LoadingSpinner inverted={true} content={'Loading app...'}/>;

    return (
        <>
            <ModalContainer/>
            <ToastContainer position={"bottom-right"}/>
            <Route exact path={'/'} component={HomePage}/>
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavBar/>
                    <Container>
                        <Switch>
                            <PrivateRoute exact path={'/activities'} component={ActivityDashboard}/>
                            <PrivateRoute path={'/activities/:id'} component={ActivityDetails}/>
                            <PrivateRoute
                                key={location.key}
                                path={['/createActivity', '/manageActivity/:id']}
                                component={ActivityFormModal}/>
                            <PrivateRoute path={'/profile/:username'} component={ProfilePage}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </>
            )}/>
        </>
    )
};

export default withRouter(observer(App));
