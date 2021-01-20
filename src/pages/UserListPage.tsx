import React, { useEffect, useState } from 'react'
import { LoginOut } from "../pages/Header/LoginOut"
import { FirstTopBlock } from "../components/FirstTopBlock"
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { WUserText, WUserImg } from "../styles/General"
import axios from "axios"
import styled from "styled-components"

const WUserListSection = styled.section`
    padding-top:100px;
    padding-bottom:100px;
`

const WUserListContainer = styled.div`
    display:flex;
    justify-content: center;
    max-width:1200px;
    margin:auto;
    flex-wrap: wrap;
`
const WUserBlock = styled.figure`
    width:33%;
    display: flex;
    a{
        margin: 0 auto;
    }
`


interface UserListPageProps {

}

export const UserListPage: React.FC<UserListPageProps> = ({ }) => {

    const [userList, setUserList] = useState([])

    useEffect(() => {
        const axiosGetAllUserList = async () => {
            const res = axios.get("https://weblab-react-special-midtern.herokuapp.com/v1/users/")
            return res
        }
        axiosGetAllUserList()
            .then((res: any) => {
                console.log("UserListPage", res.data.result)
                setUserList(res.data.result)
            }).catch((err) => {
                console.log(err)
            })
    }, [])
    console.log("userList", userList);
    return (
        <>
            <BrowserRouter>
                <FirstTopBlock />
                <LoginOut />
                <WUserListSection>
                    <WUserListContainer>
                        {
                            userList.length > 0 && userList.map((user: any) => {
                                return (
                                    <WUserBlock>
                                        <Link to={`/UserPage/users/${user.id}`}>
                                            <WUserImg src={user.picture_url} alt="userImg" />
                                            <WUserText>{user.username}</WUserText>
                                        </Link>
                                    </WUserBlock>
                                )
                            })
                        }
                    </WUserListContainer>
                </WUserListSection >
            </BrowserRouter>
        </>

    );
}