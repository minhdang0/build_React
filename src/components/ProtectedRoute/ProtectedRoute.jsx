import config from '@/configs';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import authService from '@/services/authService';

const ProtectedRoute = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    console.log(location)

    useEffect(() => {
        setLoading(true);

        (async () => {
            try {
                const data = await authService.currentUser();
                setCurrentUser(data.user);
                setLoading(false)
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })()
    }, [])

    if (loading) {
        return <div>...Loading</div>
    }

    if (!currentUser) {
        const path = encodeURIComponent(location.pathname);
        return <Navigate to={`${config.routes.login}${path ? `?continue=${path}` : ""}`} />;
    }

    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.element,
}
export default ProtectedRoute
