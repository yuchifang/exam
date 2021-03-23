import React from 'react'
import styled from "styled-components"
import { Blue400, Blue600, Button } from "../../styles/General"
import { RouteComponentProps } from "react-router-dom"

export const Logout: React.FC<RouteComponentProps> = ({ history }) => {

    const handleHomeTitle = () => {
        const locationState = {
            pathname: "/UserListPage/users/",
            state: history.location.state
        }
        history.push(locationState)
    }

    const handleLoginOutButton = () => {
        const locationState = {
            pathname: "/LoginPage/login",
            state: undefined
        }
        history.push(locationState)
    }


    return (
        <WHeaderBlock>
            <WTitle onClick={() => handleHomeTitle()}>Home</WTitle>
            <WLoginButton onClick={() => handleLoginOutButton()}>登出</WLoginButton>
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
    font-weight:bold;
    padding: 5px 10px;
   ${Button}
`

const WTitle = styled.div`
    font-size:16px;
    color:blue;
    cursor:pointer;
`
