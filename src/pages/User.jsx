import config from '@/configs';
import userService from '@/services/userService';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const User = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        (async () => {
            const users = await userService.getAll();
            console.log(users);
            setUser(users)
        })()
    }, []);

    return (
        <>
            <h1>User Page</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`${config.routes.user}${user.slug}`}>
                            {`${user.firstName} ${user.lastName}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default User;
