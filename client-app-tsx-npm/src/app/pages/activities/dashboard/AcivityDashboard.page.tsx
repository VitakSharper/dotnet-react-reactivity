import React, {useContext, useEffect, useState} from "react";
import {Grid, Segment, Button} from "semantic-ui-react";

import ActivityDashboardList from "./ActivityDashboardList.component";
import LoadingSpinner from "../../../components/helpers/LoadingSpinner.component";

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/Root.store";

const ActivityDashboard = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadActivities, loading, setPage, page, totalPages} = rootStore.activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPage(page + 1);
        loadActivities().then(() => setLoadingNext(false))
    };

    useEffect(() => {
        loadActivities();
    }, [loadActivities]);

    if (loading && page === 0) return <LoadingSpinner content={'Loading activities...'} inverted={true}/>;

    return (
        <Segment>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDashboardList/>
                    <Button basic positive
                            disabled={totalPages === page + 1}
                            floated={"right"}
                            content={'More...'}
                            onClick={handleGetNext}
                            loading={loadingNext}/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <h2>Activity Filters</h2>
                </Grid.Column>
            </Grid>
        </Segment>)
};

export default observer(ActivityDashboard);
