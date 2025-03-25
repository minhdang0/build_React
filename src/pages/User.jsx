import config from '@/configs';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const User = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        fetch("https://api01.f8team.dev/api/users", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => {
                console.log(res);
                if (!res.ok) throw res;
                return res.json();
            })
            .then((users) => {
                setUser(users);
            })
            .catch((error) => console.log(error));
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
