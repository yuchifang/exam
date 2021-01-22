import React, { useRef, useState } from 'react'
import { WInput, WSubmitButtom } from "../../styles/General"
import axios from "axios"
import jwtDecode from "jwt-decode";
import { Spinner } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom"
interface LoginAccountProps extends RouteComponentProps {

}

interface DecodedData {
    memberId: string,
    username: string
}

export const LoginAccount: React.FC<LoginAccountProps> = ({ history, match, location }) => {

    const passwordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const [loginStatus, setLoginStatus] = useState("idle")
    // const [jwtString, setJwtString] = useState("")

    const axiosLoginInAccount = async () => {
        setLoginStatus("loading")
        const res: any = await axios.post("https://api.weblab.tw/v1/auth/general-login", {
            appId: "weblab",
            account: nameRef.current?.value,
            password: passwordRef.current?.value
        })
        return res
    }

    const handleSubmit = () => {
        axiosLoginInAccount()
            .then((res) => {
                const jwtString = res.data.result.authToken
                const decoded: DecodedData = jwtDecode(res.data.result.authToken)
                console.log("decoded", decoded)
                const state = {
                    memberId: decoded?.memberId,
                    jwtString: jwtString,
                    username: decoded?.username
                }
                console.log("LoginAccount", state)
                return state
            })
            .then((res) => {
                const location = {
                    pathname: "/UserListPage/users",
                    state: res
                }
                setLoginStatus("success")
                history.push(location)
            })
            .catch((res) => {
                setLoginStatus("errorr")
                alert(res)
            })
    }

    return (
        <>
            <WInput placeholder="使用者名稱" type="text" ref={nameRef} />
            <WInput placeholder="密碼" type="password" ref={passwordRef} />
            <WSubmitButtom onClick={() => handleSubmit()}>
                {loginStatus !== "loading" && "登入"}
                {loginStatus === "loading" && <Spinner size="sm" animation="border" />}
            </WSubmitButtom>
        </>
    );
}