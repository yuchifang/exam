import React, { useRef } from 'react'
import { WInput, WSubmitButtom, WTag } from "../../styles/General"
import axios from "axios"
import { RouteComponentProps, Link } from 'react-router-dom'
import styled from "styled-components"
import { FirstTopBlock } from "../../components/FirstTopBlock"

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



    const axiosCreateAccount = async () => {
        const res = axios.post("https://api.weblab.tw/v1/auth/register", {
            appId: "weblab",
            email: emailRef.current?.value,
            username: nameRef.current?.value,
            password: passwordRef.current?.value
        })
        return res
    }
    //create success => get 資料

    const handleSubmit = () => {
        console.log("eeeeeeee")
        axiosCreateAccount()
            .then((res) => {
                console.log("res", res)
            }).catch((err) => {
                alert(err)
            }).then(() => {
                // history
            })
    }

    const get = () => {
        axios.get("https://weblab-react-special-midtern.herokuapp.com/v1/users/")
            .then((res) => { console.log("res", res.data) })

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
                    <WSubmitButtom onClick={() => handleSubmit()}>加入</WSubmitButtom>
                    <WSubmitButtom onClick={() => get()}>取</WSubmitButtom>
                </WLoginContainer>
            </WLoginSection>
        </>
    );
}