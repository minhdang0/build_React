import authService from '@/services/authService';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

const RegisterOther = () => {
    const [errorSever, setErrorServer] = useState({})
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        criteriaMode: "all"
    });

    const getName = (name) => {
        const parts = name.trim().split(" ").map((item) => item);
        if (parts.length === 1) return [parts[0], ""];
        const firstName = parts.pop();
        const lastName = parts.join(" ");
        return [firstName, lastName];
    };

    const onSubmit = async (data) => {
        setErrorServer("")
        console.log(data)

        const [firstName, lastName] = getName(data.fullname);

        const requestData = {
            firstName,
            lastName,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        }
        console.log(requestData)
        try {
            const res = await authService.register(requestData);


            if (!res.ok) {
                if (data.errors) {
                    setErrorServer(data.errors);
                } else if (data.message) {
                    setErrorServer((prev) => ({ ...prev, general: data.message }));
                } else {
                    setErrorServer((prev) => ({ ...prev, general: "Đã xảy ra lỗi, vui lòng thử lại." }));
                }
                throw new Error(data.message || "Đăng ký thất bại");
            }

            localStorage.setItem("token", data.access_token);
            navigate("/");
        } catch (error) {
            console.log("Lỗi đăng ký:", error);
            setErrorServer((prev) => ({ ...prev, general: "Lỗi máy chủ, vui lòng thử lại sau." }));
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="fullname">Họ và Tên:</label>
            <input
                id="fullname"
                defaultValue=""
                type="text"
                placeholder="Họ và Tên"
                {...register("fullname", { required: "Họ và Tên là bắt buộc" })}
            />
            {errors.fullname && <p>{errors.fullname.message}</p>}
            {errorSever.fullname && <p>{errorSever.fullname}</p>}
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input
                id="email"
                defaultValue=""
                placeholder="Email"
                type="email"
                {...register("email", { required: "Email là bắt buộc" })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            {errorSever.email && <p>{errorSever.email}</p>}

            <label htmlFor="password">Password</label>
            <input
                id="password"
                defaultValue=""
                placeholder="password"
                type="password"
                {...register("password", { required: "Password là bắt buộc" })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            {errorSever.password && <p>{errorSever.password}</p>}

            <label htmlFor="confirmPassword">Confirm password</label>
            <input
                id="confirm_password"
                defaultValue=""
                placeholder="confirm password"
                type="password"
                {...register("password_confirmation", { required: "Password là bắt buộc" })}
            />
            {errors.password_confirmation && <p>{errors.password.message}</p>}
            {errorSever.password_confirmation && <p>{errorSever.password_confirmation}</p>}


            <button type="submit">Đăng ký</button>
        </form>
    );
}

export default RegisterOther;
