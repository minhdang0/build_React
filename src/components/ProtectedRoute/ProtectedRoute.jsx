import config from '@/configs';
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    console.log(location)

    useEffect(() => {
        setLoading(true);
        fetch('https://api01.f8team.dev/api/auth/me', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw res;
                }
                return res.json();
            })
            .then((data) => {
                setCurrentUser(data.user);
            })
            .catch((error) => {
                if (error.status === 401) {
                    console.log()
                }
            })
            .finally(() => {
                setLoading(false)
            })
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
