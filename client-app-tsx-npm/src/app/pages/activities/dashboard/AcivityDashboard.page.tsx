import React, {useContext, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import InfiniteScroll from 'react-infinite-scroller';
import {Grid, Segment, Loader, Sticky, Rail, Ref} from "semantic-ui-react";

import ActivityDashboardList from "./ActivityDashboardList.component";
import ActivityDashboardFilter from "./ActivityDashboardFilter.component";
import ActivityListItemPlaceholder from "../../../components/helpers/ActivityListItemPlaceholder.component";


import {RootStoreContext} from "../../../store/Root.store";

const styles = {
    activityListSegment: {
        background: '#7986CB'
    }
};

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

    return (
        <Grid>
            <>
                <Grid.Column width={10}>
                    <Segment style={styles.activityListSegment}>
                        {loading && page === 0
                            ? (<ActivityListItemPlaceholder/>)
                            : (
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={handleGetNext}
                                    hasMore={!loadingNext && page + 1 < totalPages}
                                    initialLoad={false}>
                                    <ActivityDashboardList/>
                                </InfiniteScroll>
                            )}
                    </Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Ref innerRef={contextRef}>
                        <Rail position={"right"} attached internal>
                            <Sticky context={contextRef} offset={70} style={{marginTop: '100px', zIndex: '1'}}>
                                <ActivityDashboardFilter/>
                            </Sticky>
                        </Rail>
                    </Ref>
                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loadingNext}/>
                </Grid.Column>
            </>
        </Grid>
    )
};

export default observer(ActivityDashboard);
