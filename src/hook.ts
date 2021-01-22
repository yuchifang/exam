import React, { useState, useEffect } from "react"
import axios from "axios"
import jwtDecode from "jwt-decode";

interface useUserProps {
    account: string,
    password: string,
}

interface DecodedData {
    memberId: string,
    username: string,
    jwtString: string
}

export const useUser = ({ account, password }: useUserProps) => {
    const [axiosStatus, setAxiosStatus] = useState("idle")
    const [userData, setUserData] = useState<DecodedData>()
    const [errorCode, setErrorCode] = useState("")

    useEffect(() => {
        const axiosLoginIn = async () => {
            setAxiosStatus("loading")
            const res = axios.post("https://api.weblab.tw/v1/auth/general-login", {
                appId: "weblab",
                account: account,
                password: password
            })
            return res
        }
        axiosLoginIn()
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
            .catch((res) => {
                setAxiosStatus("error")
                setErrorCode(res)
                return res
            })

    }, [])

    return {
        axiosStatus,
        userData,
        errorCode
    }

}