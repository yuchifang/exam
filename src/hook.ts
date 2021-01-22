import React, { useState, useEffect } from "react"
import axios from "axios"
import jwtDecode from "jwt-decode";

interface loginUserProps {
    account: string,
    password: string,
}

interface createUserProps {
    email: string,
    username: string,
    password: string
}
interface DecodedData {
    memberId: string,
    username: string,
    jwtString: string
}

export const useUser = () => {
    const [axiosStatus, setAxiosStatus] = useState("idle")
    const [userData, setUserData] = useState<DecodedData>()
    const [errorCode, setErrorCode] = useState("")

    console.log("errorCode", errorCode)
    console.log("axiosStatus", axiosStatus)

    return {
        axiosStatus,
        userData,
        errorCode,
        axiosLoginAccount: ({ account, password }: loginUserProps) => {
            const axiosLogin = async () => {
                setAxiosStatus("loading")
                const res = axios.post("https://api.weblab.tw/v1/auth/general-login", {
                    appId: "weblab",
                    account: account,
                    password: password
                })
                return res
            }
            axiosLogin()
                .then((res) => {
                    const jwtString = res.data.result.authToken
                    const decoded: DecodedData = jwtDecode(res.data.result.authToken)
                    const locationState = {
                        memberId: decoded?.memberId,
                        jwtString: jwtString,
                        username: decoded?.username
                    }
                    return locationState
                })
                .then((res) => {
                    setUserData(res)
                })
                .then((res) => {
                    setAxiosStatus("success")
                })
                .then(() => {
                    setErrorCode("success no error")
                })
                .catch((err) => {
                    setAxiosStatus("error")
                    setErrorCode(err)
                })

        },
        axiosCreateAccount: ({ email, username, password }: createUserProps) => {
            const axiosCreate = async () => {
                setAxiosStatus("loading")
                const res = axios.post("https://api.weblab.tw/v1/auth/register", {
                    appId: "weblab",
                    email: email,
                    username: username,
                    password: password
                })
                return res
            }
            axiosCreate()
                .then((res) => {
                    const jwtString = res.data.result.authToken
                    const decoded: DecodedData = jwtDecode(res.data.result.authToken)
                    const locationState = {
                        memberId: decoded?.memberId,
                        jwtString: jwtString,
                        username: decoded?.username
                    }
                    return locationState
                })
                .then((res) => {
                    setUserData(res)
                })
                .then((res) => {
                    setAxiosStatus("success")
                })
                .then(() => {
                    setErrorCode("success no error")
                })
                .catch((err) => {
                    console.log("hooks", err)
                    setAxiosStatus("error")
                    setErrorCode(err)
                })
        }

    }

}