import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ condition, redirectTo, children }) => {

    if (condition) {
        return children;
    }

    return <Navigate to={redirectTo} replace/>;
};

export default PrivateRoute;