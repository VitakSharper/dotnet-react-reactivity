import React from "react";

const WithSpinner = WrappedComponent => ({isLoading, ...otherProps}) => {
    console.log('Is loading: ', isLoading)
    return isLoading
        ? (<h1>LOADING...</h1>)
        : (<WrappedComponent {...otherProps}/>)
};

export default WithSpinner;
