import InputText from '@/components/InputText/InputText';
import authService from '@/services/authService';
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
            setError((prev) => ({ ...prev, fullName: "Họ và tên không được để trống" }));
            return;
        }
        if (!email.trim()) {
            setError((prev) => ({ ...prev, email: "Email không được để trống" }));
            return;
        }
        if (!password.trim()) {
            setError((prev) => ({ ...prev, password: "Mật khẩu không được để trống" }));
            return;
        }
        if (password !== passwordConfirm) {
            setError((prev) => ({ ...prev, passwordConfirm: "Mật khẩu không khớp" }));
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
            const data = await authService.register(requestData);

            if (data.errors) {
                setError(data.errors);
            } else if (data.message) {
                setError((prev) => ({ ...prev, general: data.message }));
            } else {
                setError((prev) => ({ ...prev, general: "Đã xảy ra lỗi, vui lòng thử lại." }));
            }

            localStorage.setItem("token", data.access_token);
            navigate("/");
        } catch (error) {
            console.log("Lỗi đăng ký:", error);
            setError((prev) => ({ ...prev, general: "Lỗi máy chủ, vui lòng thử lại sau." }));
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