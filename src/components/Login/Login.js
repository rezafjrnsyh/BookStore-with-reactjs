import React, {useState} from 'react';
import PropTypes from 'prop-types';
import service from '../../services/MemberService'
import * as Yup from 'yup';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Button, Form} from "react-bootstrap";

async function loginUser(credentials) {
    return fetch('http://localhost:8801/v1/member/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function Login({ setValid, setToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const onSubmit = data => {
        // e.preventDefault();
        console.log(data)
        return service.SignIn(data)
            .then(res =>{
                console.log(res)
                res.status !== 200 ? setValid(false) : setValid(true)
            }).catch(err => {
                console.log(err)
                setError("Username and password do not match")
            })
    }

    const validateSchema = Yup.object().shape({
        email: Yup.string()
            .required("Email is required")
            .email("Please enter a valid email")
            .min(2, "Must be more than 10 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(2, "Must be more than 10 characters")
    })

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: yupResolver(validateSchema)
    })

    return(
        <div style={{height:'800px',display:"flex", justifyContent:"center",alignItems:"center"}}>
            <div style={{display:"flex", flexDirection:"column", border: '2px solid #2d2d2d', borderRadius:'10px', padding:'30px'}}>
                <h1>Please SignIn</h1>
                <form onSubmit={handleSubmit(onSubmit)} style={{display:"flex", justifyContent:'center',flexDirection:"column",}} >
                    <label>
                        <p>Email</p>
                        <input type="email" {...register("email")}  className={`form-control ${errors.email ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.email?.message}</div>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" {...register("password")}  className={`form-control ${errors.password ? 'is-invalid' : ''}`}/>
                        <div className="invalid-feedback">{errors.password?.message}</div>
                    </label>
                    <div style={{marginTop:"10px"}}>
                        <Button type="submit" variant={"primary"}>Login</Button>
                    </div>
                </form>
                <div><p>{error}</p></div>
            </div>
        </div>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
