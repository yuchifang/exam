import React from 'react'
import styled from "styled-components"
import { outLineBlue, headerBlue, baseGray } from "../../styles/General"
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"

const WHeaderBlock = styled.div`
    width:100%;
    height:50px;
    background-color: ${headerBlue};
    border: 2px solid ${outLineBlue};
    box-sizing: border-box;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`

const WLoginButton = styled.button`
    padding: 5px 10px;
    color: ${outLineBlue};
    cursor:pointer;
    border: 2px solid ${outLineBlue};
    &:active{
        border: 2px solid ${outLineBlue};
        background-color: #ddd;
    }
    &:focus{
        outline: 1px solid  ${outLineBlue};
    }
`

interface LoginOutProps {

}

export const LoginOut: React.FC<LoginOutProps> = ({ }) => {
    return (
        <WHeaderBlock>
            <Link to="/UserListPage/users/">Home</Link>
            <Link to="/LoginPage/login/">
                <WLoginButton>登出</WLoginButton>
            </Link>
        </WHeaderBlock >
    );
}