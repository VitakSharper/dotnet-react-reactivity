import React, {useContext, useEffect, useState} from "react";
import {Grid, Segment, Loader, Sticky, Rail, Ref} from "semantic-ui-react";

import ActivityDashboardList from "./ActivityDashboardList.component";
import LoadingSpinner from "../../../components/helpers/LoadingSpinner.component";

import ActivityDashboardFilter from "./ActivityDashboardFilter.component";

import InfiniteScroll from 'react-infinite-scroller';

import {observer} from "mobx-react-lite";
import {RootStoreContext} from "../../../store/Root.store";

const ActivityDashboard = () => {
    const rootStore = useContext(RootStoreContext);
    const {loadActivities, loading, setPage, page, totalPages} = rootStore.activityStore;
    const [loadingNext, setLoadingNext] = useState(false);
    const contextRef = React.createRef();

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
        <Grid>
            <Ref innerRef={contextRef}>
                <Segment>
                    <Grid.Column width={10}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={handleGetNext}
                            hasMore={!loadingNext && page + 1 < totalPages}
                            initialLoad={false}>
                            <ActivityDashboardList/>
                        </InfiniteScroll>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Rail position={"right"}>
                            <Sticky context={contextRef} offset={70}>
                                <ActivityDashboardFilter/>
                            </Sticky>
                        </Rail>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Loader active={loadingNext}/>
                    </Grid.Column>
                </Segment>
            </Ref>
        </Grid>
    )
};

export default observer(ActivityDashboard);
