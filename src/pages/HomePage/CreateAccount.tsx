import React, { useState, useEffect, useRef } from 'react'
import { WInput, WSubmitButtom } from "../../styles/General"
import axios from "axios"
interface CreateAccountProps {

}

export const CreateAccount: React.FC<CreateAccountProps> = ({ }) => {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)



    const axiosCreateAccount = async () => {
        const res = axios.post("https://api.weblab.tw/v1/auth/register", {
            appId: "weblab",
            email: emailRef.current?.value,
            username: nameRef.current?.value,
            password: passwordRef.current?.value
        })
        return res
    }

    const handleSubmit = () => {
        console.log("eeeeeeee")
        axiosCreateAccount()
            .then((res) => {
                console.log("res", res)
            }).catch((err) => {
                alert(err)
            })
    }

    const get = () => {
        axios.get("https://weblab-react-special-midtern.herokuapp.com/v1/users/")
            .then((res) => { console.log("res", res.data) })

    }
    return (
        <>
            <WInput placeholder="電子信箱" type="email" ref={emailRef} />
            <WInput placeholder="使用者名稱" type="text" ref={passwordRef} />
            <WInput placeholder="密碼" type="password" ref={nameRef} />
            <WSubmitButtom onClick={() => handleSubmit()}>加入</WSubmitButtom>
            <WSubmitButtom onClick={() => get()}>取</WSubmitButtom>
        </>
    );
}