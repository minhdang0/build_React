import InputText from '@/components/InputText/InputText';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState({});

    const navigate = useNavigate();
    const getName = (name) => {
        const newArr = name.trim().split(" ").map((item) => item);
        const firstName = newArr.pop();
        const lastName = newArr.join(" ")

        return [firstName, lastName]
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        if (password !== passwordConfirm) {
            setError({ passwordConfirm: "Mật khẩu không khớp" });
            return;
        }

        const [firstName, lastName] = getName(fullName);

        try {
            const res = await fetch("https://api01.f8team.dev/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    password_confirmation: passwordConfirm
                })
            })

            const data = await res.json();

            if (!res.ok) {
                setError(data.errors || {})
                throw data;
            }

            localStorage.setItem("token", `${data.access_token}`);
            navigate("/");
        } catch (error) {
            if (error.message && error.message.includes(email)) {
                setError({ email: "Email này đã được sử dụng.Vui lòng sử dụng email khác." });
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <InputText
                label="Fullname"
                type="text"
                placeholder="Vui lòng nhập họ tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={error.fullName}
            />
            <InputText
                label="Email"
                type="text"
                placeholder="Vui lòng nhập Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
            />
            <InputText
                label="Password"
                type="password"
                placeholder="Vui lòng nhập họ tên"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
            />
            <InputText
                label="Confirm password"
                type="password"
                placeholder="Vui lòng nhập họ tên"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                error={error.passwordConfirm}
            />
            <button>Register</button>
        </form>
    )
}

export default Register
