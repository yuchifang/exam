import React, { useRef, useEffect } from 'react'
import { RouteComponentProps, Link } from "react-router-dom"
import styled from "styled-components"

import { useUser } from "../../hook"
import { WInput, WSubmitButton, WTag } from "../../styles/General"
import { WebTopBlock } from "../../components/WebTopBlock"

export const LoginAccount: React.FC<RouteComponentProps> = ({ history }) => {

    const passwordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const { axiosStatus, axiosUserData, errorCode, message, axiosLoginAccount } = useUser()

    useEffect(() => {
        if (axiosStatus === "success") {
            const location = {
                pathname: "/UserListPage/users",
                state: axiosUserData
            }
            history.push(location)
        } else if (axiosStatus === "error") {
            alert("errorCode: " + errorCode + "message: " + message)
        }

    }, [errorCode])

    const handleSubmit = () => {
        let account: string
        let password: string
        if (nameRef.current?.value !== undefined && passwordRef.current?.value !== undefined) {
            account = nameRef.current?.value
            password = passwordRef.current?.value
            axiosLoginAccount({ password, account })
        } else {
            alert("使用者名稱　密碼　不能為空白")
        }
    }

    return (
        <>
            <WebTopBlock />
            <WLoginSection>
                <WLoginContainer>
                    <WTagBlock>
                        <WTag>
                            <Link to="/LoginPage/login">會員登入</Link>
                        </WTag>
                        <WTag>
                            <Link to="/SignUpPage/signUp">加入會員</Link>
                        </WTag>
                    </WTagBlock>
                    <WInput placeholder="使用者名稱" type="text" ref={nameRef} />
                    <WInput placeholder="密碼" type="password" ref={passwordRef} />
                    <WSubmitButton onClick={() => handleSubmit()}>
                        {axiosStatus !== "loading" && "登入"}
                        {axiosStatus === "loading" && "登入中"}
                    </WSubmitButton>
                </WLoginContainer>
            </WLoginSection>
        </>
    );
}

const WLoginSection = styled.section`
    padding-top:200px;
    padding-bottom:200px;
`

const WLoginContainer = styled.div`
    display:flex;
    justify-content: center;
    width:200px;
    flex-direction: column;
    margin:auto;
`

const WTagBlock = styled.div`
    display:flex;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 10px;
`