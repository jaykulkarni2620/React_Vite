import React, { useState } from "react";
import {Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from './index'
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"

function Login () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit} = useForm();
    const [error, setError] = useState("")


    const login = async(data) => {
        setError("");
        try {
           const session = await authService.login(data);
           if (session) {
            const userData = await authService.getCurrentUser()
            if (userData) {
                dispatch(authLogin(userData))
                // if user login then route pe usko bhej do ( Link pe click karna padta hai or navigate me khudse redirect hota hai )
                navigate('/')
            }
           }
        } catch (error) {
            setError(error.message)
        }

    }


    return(
        <div>
            Login
        </div>
    )
}

export default Login;