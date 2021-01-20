import React from 'react'
import styled from "styled-components"
import { WTag } from "../../styles/General"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
import { LoginAccount } from "./LoginAccount"
import { CreateAccount } from "./CreateAccount"
import { FirstTopBlock } from "../../components/FirstTopBlock"
import { LoginIn } from "../Header/LoginIn"


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

interface LoginPageProps {

}

export const HomePage: React.FC<LoginPageProps> = ({ }) => {
    return (
        <>
            <FirstTopBlock />
            <LoginIn />
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
                    <Switch>
                        <Route path="/LoginPage/login" component={LoginAccount} />
                        <Route path="/SignupPage/signup" component={CreateAccount} />
                    </Switch>
                </WLoginContainer>
            </WLoginSection>
        </>
    );
}