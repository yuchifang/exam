import React from 'react'
import styled from "styled-components"
import { outLineBlue, headerBlue } from "../../styles/General"
import { Link, RouteComponentProps } from "react-router-dom"

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

const WTitle = styled.div`
    font-size:16px;
    color:blue;
    cursor:pointer;
`

// const 
interface LoginOutProps extends RouteComponentProps {

}

export const Logout: React.FC<LoginOutProps> = ({ history }) => {
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