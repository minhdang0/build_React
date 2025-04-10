import config from "@/configs";
import useQuery from "@/hooks/useQuery";
import authService from "@/services/authService";
import httpRequest from "@/utils/httpRequest";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email,
            password
        }
        try {
            const res = await authService.login(formData);
            httpRequest.setToken(res.access_token);
            navigate(query.get("continue") || config.routes.home);
        } catch (error) {
            setHasError(true);
        }
        // fetch('https://api01.f8team.dev/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify(formData)
        // })
        //     .then((res) => {
        //         if (!res.ok) throw res;
        //         return res.json();
        //     })
        //     .then((data) => {
        //         httpRequest.setToken(data.access_token);
        //         navigate(query.get("continue") || config.routes.home);
        //     })
        //     .catch(() => {
        //         setHasError(true);
        //     })
    }

    return (
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name="email" value={email} onChange={(e) => {
                setEmail(e.target.value)
                setHasError(false);
            }} />
            <br />
            <input type="password" name="password" value={password} onChange={(e) => {
                setPassword(e.target.value);
                setHasError(false);
            }} />
            <br />
            <button
                type="submit">Login</button>
            {hasError && <p>Email hoặc mật khẩu không hợp lệ</p>}
        </form>
    );
};

export default Login;
