import authService from '@/services/authService';
import httpRequest from '@/utils/httpRequest';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from './../../../node_modules/@hookform/resolvers/yup/src/yup';

const userSchema = yup
    .object({
        fullname: yup.string().required("Truong nay la bat buoc"),
        email: yup.string().email("Nhap email hop le").required("Truong nay la bat buoc"),
        password: yup.string().min(8, "it nhat 8 ky tu").required("Truong nay la bat buoc"),
        password_confirmation: yup.string().min(8, "it nhat 8 ky tu").required("Truong nay la bat buoc"),
    })
    .required();

const RegisterOther = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, setError, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema),
    })

    const getName = (name) => {
        const parts = name.trim().split(" ");
        if (parts.length === 1) return [parts[0], ""];
        const firstName = parts.pop();
        const lastName = parts.join(" ");
        return [firstName, lastName];
    };

    const onSubmit = async (data) => {
        const [firstName, lastName] = getName(data.fullname);

        const requestData = {
            firstName,
            lastName,
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation
        };

        console.log(requestData);
        try {
            const resData = await authService.register(requestData);

            console.log(resData);
            if (resData.status === "error") throw resData.message;
            httpRequest.setToken(resData.access_token);
            navigate("/");
        } catch (error) {
            console.log(error)
            setError("password_confirmation", {
                type: "manual",
                message: `${error}`
            })
        }
    };

    return (
        <form style={{ display: 'flex', flexDirection: "column", width: '500px', gap: '5px' }} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="fullname">Họ và Tên:</label>
            <input
                id="fullname"
                type="text"
                placeholder="Họ và Tên"
                {...register("fullname")}
            />
            {errors.fullname && <p>{errors.fullname.message}</p>}

            {/* Email */}
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                placeholder="Email"
                type="email"
                {...register("email")}
            />
            {errors.email && <p>{errors.email.message}</p>}

            {/* Password */}
            <label htmlFor="password">Password:</label>
            <input
                id="password"
                placeholder="Mật khẩu"
                type="password"
                {...register("password")}
            />
            {errors.password && <p>{errors.password.message}</p>}

            {/* Confirm Password */}
            <label htmlFor="password_confirmation">Xác nhận mật khẩu:</label>
            <input
                id="password_confirmation"
                placeholder="Xác nhận mật khẩu"
                type="password"
                {...register("password_confirmation")}
            />
            {errors.password_confirmation && <p>{errors.password_confirmation.message}</p>}

            <button type="submit">Đăng ký</button>
        </form>
    );
}

export default RegisterOther;
