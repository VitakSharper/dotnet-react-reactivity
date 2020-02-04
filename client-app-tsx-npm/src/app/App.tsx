import React, {useContext, useEffect} from 'react';
import {Route, Switch, withRouter, RouteComponentProps} from 'react-router-dom';
import {observer} from "mobx-react-lite";
import {Container} from "semantic-ui-react";


import NavBar from "./pages/nav/NavBar.component";
import HomePage from "./pages/home/HomePage";
import NotFound from "./components/NotFound.component";

import ActivityDashboard from "./pages/activities/dashboard/AcivityDashboard.page";
import ActivityDetails from "./pages/activities/activityDetail/ActivityDetails.page";
import ActivityFormModal from "./components/Modals/ActivityFormModal.component";
import ModalContainer from "./components/Modals/ModalContainer.component";

import {ToastContainer} from "react-toastify";
import LoginForm from "./components/Forms/LoginForm.component";
import {RootStoreContext} from "./store/Root.store";
import LoadingSpinner from "./components/LoadingSpinner.component";

const App: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
    const {getUser} = rootStore.userStore;


    useEffect(() => {
        token
            ? getUser().finally(() => setAppLoaded())
            : setAppLoaded()
    }, [setAppLoaded, token, getUser]);

    if (!appLoaded) return <LoadingSpinner content={'Loading app...'}/>;

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
                            <Route exact path={'/activities'} component={ActivityDashboard}/>
                            <Route path={'/activities/:id'} component={ActivityDetails}/>
                            <Route key={location.key} path={['/createActivity', '/manageActivity/:id']}
                                   component={ActivityFormModal}/>
                            <Route path={'/login'} component={LoginForm}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </Container>
                </>
            )}/>
        </>
    )
};

export default withRouter(observer(App));
