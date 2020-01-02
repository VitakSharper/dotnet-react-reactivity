import React from "react";

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    return isLoading
        ? (<h1>LOADING...</h1>)
        : (<WrappedComponent {...otherProps}/>)
};

export default WithSpinner;
