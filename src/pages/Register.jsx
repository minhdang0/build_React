import InputText from '@/components/InputText/InputText';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const getName = (name) => {
        const parts = name.trim().split(" ").map((item) => item);
        if (parts.length === 1) return [parts[0], ""];
        const firstName = parts.pop();
        const lastName = parts.join(" ");
        return [firstName, lastName];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError({});

        if (!fullName.trim()) {
            setError((prevs) => ({ ...prevs, fullName: "Họ và tên không được để trống" }));
            return;
        }
        if (!email.trim()) {
            setError((prevs) => ({ ...prevs, email: "Email không được để trống" }));
            return;
        }
        if (!password.trim()) {
            setError((prevs) => ({ ...prevs, password: "Mật khẩu không được để trống" }));
            return;
        }
        if (password !== passwordConfirm) {
            setError((prevs) => ({ ...prevs, passwordConfirm: "Mật khẩu không khớp" }));
            return;
        }

        const [firstName, lastName] = getName(fullName);
        const requestData = {
            firstName,
            lastName,
            email,
            password,
            password_confirmation: passwordConfirm,
        };

        try {
            const res = await fetch("https://api01.f8team.dev/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            const data = await res.json();

            if (!res.ok) {
                if (data.errors) {
                    setError(data.errors);
                } else if (data.message) {
                    setError((prevs) => ({ ...prevs, general: data.message }));
                } else {
                    setError((prevs) => ({ ...prevs, general: "Đã xảy ra lỗi, vui lòng thử lại." }));
                }
                throw new Error(data.message || "Đăng ký thất bại");
            }

            localStorage.setItem("token", data.access_token);
            navigate("/");
        } catch (error) {
            console.error("Lỗi đăng ký:", error);
            setError((prevs) => ({ ...prevs, general: "Lỗi máy chủ, vui lòng thử lại sau." }));
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            <InputText
                label="Họ và tên"
                type="text"
                placeholder="Vui lòng nhập họ tên"
                value={fullName}
                onChange={(e) => {
                    setError({})
                    setFullName(e.target.value)
                }}
                error={error.fullName}
            />
            <InputText
                label="Email"
                type="email"
                placeholder="Vui lòng nhập email"
                value={email}
                onChange={(e) => {
                    setError({});
                    setEmail(e.target.value)
                }}
                error={error.email}
            />
            <InputText
                label="Mật khẩu"
                type="password"
                placeholder="Vui lòng nhập mật khẩu"
                value={password}
                onChange={(e) => {
                    setError({})
                    setPassword(e.target.value)
                }}
                error={error.password}
            />
            <InputText
                label="Xác nhận mật khẩu"
                type="password"
                placeholder="Vui lòng xác nhận mật khẩu"
                value={passwordConfirm}
                onChange={(e) => {
                    setError({})
                    setPasswordConfirm(e.target.value)
                }}
                error={error.passwordConfirm}
            />
            {error.general && <p style={{ color: "red" }}>{error.general}</p>}
            <button>
                Đăng ký
            </button>
        </form>
    );
};

export default Register;