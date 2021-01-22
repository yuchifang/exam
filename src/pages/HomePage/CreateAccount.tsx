import React, { useRef, useEffect } from 'react'
import { WInput, WSubmitButtom, WTag } from "../../styles/General"
import { RouteComponentProps, Link } from 'react-router-dom'
import styled from "styled-components"
import { FirstTopBlock } from "../../components/FirstTopBlock"
import { useUser } from "../../hook"
import { Spinner } from "react-bootstrap";

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
interface CreateAccountProps extends RouteComponentProps {

}

export const CreateAccount: React.FC<CreateAccountProps> = ({ history }) => {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const nameRef = useRef<HTMLInputElement>(null)
    const { axiosStatus, axiosUserData, errorCode, message, axiosCreateAccount } = useUser()

    useEffect(() => {
        if (axiosStatus === "success") {
            if (axiosUserData) {
                axiosUserData.editMode = true
                const locationUseList = {
                    pathname: `/UserPage/users/${axiosUserData?.memberId}`,
                    state: axiosUserData,
                }
                history.push(locationUseList)
            }
        } else if (axiosStatus === "error") {
            alert("errorCode: " + errorCode + "message: " + message)
        }


    }, [errorCode])

    const handleSubmit = () => {
        let email: string
        let username: string
        let password: string

        if (emailRef.current?.value !== undefined && passwordRef.current?.value !== undefined && nameRef.current?.value !== undefined) {
            email = emailRef.current?.value
            password = passwordRef.current?.value
            username = nameRef.current?.value
            axiosCreateAccount({ email, password, username })
        } else {
            alert("信箱 使用者名稱　密碼　不能為空白")
        }
    }

    return (
        <>
            <FirstTopBlock />
            <WLoginSection>
                <WLoginContainer>
                    <WTagBlock>
                        <WTag>
                            <Link to="/LoginPage/login">會員登入</Link>
                        </WTag>
                        <WTag>
                            <Link to="/SignupPage/signup">加入會員</Link>
                        </WTag>
                    </WTagBlock>
                    <WInput placeholder="電子信箱" type="email" ref={emailRef} />
                    <WInput placeholder="使用者名稱" type="text" ref={nameRef} />
                    <WInput placeholder="密碼" type="password" ref={passwordRef} />
                    <WSubmitButtom onClick={() => handleSubmit()}>
                        {axiosStatus !== "loading" && "加入"}
                        {axiosStatus === "loading" && <Spinner size="sm" animation="border" />}
                    </WSubmitButtom>
                </WLoginContainer>
            </WLoginSection>
        </>
    );
}
// 　沒有選擇圖片　情況
// 　加上必填提醒　
//　沒有更新des　情況
// 更新完回到　尚未編輯頁　