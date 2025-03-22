import config from '@/configs';
import React, { useEffect, useState } from 'react'

const User = () => {
    const [users, setUser] = useState([]);

    useEffect(() => {
        fetch("https://api01.f8team.dev/api/users")
            .then((res) => {
                if (!res.ok) throw res;

                return res.json();
            })
            .then((users) => {
                setUser(users);
            })
    })
    return (
        <>
            <h1>User Page</h1>
            <ul>
                {users.map((user) => {
                    return <li key={user.id}>
                        <Link to={`${config.routes.user}${user.slug}`} >
                            {user.firstName} + ""+{user.lastName}
                        </Link>
                    </li>
                })}
            </ul>

        </>
    )
}

export default User
