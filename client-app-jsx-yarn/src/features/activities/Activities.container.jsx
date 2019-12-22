import {connect} from 'react-redux'
import {createStructuredSelector} from "reselect";

import {selectIsActivitiesFetching, selectIsActivitiesLoaded} from "../../app/redux/activities/activity.selectors";
import WithSpinner from "../spinner/with-spinner.component";
import ActivitiesItems from "./Activities.component";

const mapStateToProps = createStructuredSelector({
    // isLoading:(state)=> !selectIsActivitiesLoaded(state)
    isLoading: selectIsActivitiesFetching
});

const ActivitiesContainer = connect(mapStateToProps)(WithSpinner(ActivitiesItems));

export default ActivitiesContainer
