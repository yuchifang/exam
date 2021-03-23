import React from 'react'
import styled from "styled-components"
import { Blue400, Blue600, Button } from "../../styles/General"
import { Link } from "react-router-dom"



export const Login: React.FC = () => {
    return (
        <WHeaderBlock>
            <Link to="/UserListPage/users/">Home</Link>
            <Link to="/LoginPage/login/">
                <WLoginButton>登入</WLoginButton>
            </Link>
        </WHeaderBlock >
    );
}

const WHeaderBlock = styled.div`
    width:100%;
    height:50px;
    background-color: ${Blue600};
    border: 2px solid ${Blue400};
    box-sizing: border-box;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
`

const WLoginButton = styled.button`
    padding: 5px 10px;
   ${Button}
`