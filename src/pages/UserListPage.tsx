import React, { useEffect, useState } from 'react'
import { LoginOut } from "../pages/Header/LoginOut"
import { FirstTopBlock } from "../components/FirstTopBlock"
import { BrowserRouter, Switch, Route, Link, RouteComponentProps, useLocation } from 'react-router-dom'
import { WUserText, WUserImg } from "../styles/General"
import axios from "axios"
import styled from "styled-components"
import { Location } from "history"

const WUserListSection = styled.section`
    padding-top:100px;
    padding-bottom:100px;
`

const WUserListContainer = styled.div`
    display:flex;
    justify-content: center;
    max-width:1000px;
    margin:auto;
    flex-wrap: wrap;
`
const WUserBlock = styled.figure`
    cursor:pointer;
    margin: 0 4rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
`

interface UserListPageProps extends RouteComponentProps<{}, {}, TLocation> {

}

interface TLocation {
    // hash: string | undefined
    // key: string | undefined
    // pathname: string | undefined
    // search: string | undefined
    jwtString: string,
    name: string,
    memberId: string,
    // state?: {
    //     jwtString: string
    // } | undefined
}
interface TUser {
    id: string,
    picture_url: string | null,
    username: string,
}

export const UserListPage: React.FC<UserListPageProps> = ({ history, location }) => {
    const [userList, setUserList] = useState<TUser[]>([])
    console.log("location", location)
    console.log("history", history)
    useEffect(() => {
        const axiosGetAllUserList = async () => {
            const res = axios.get("https://weblab-react-special-midtern.herokuapp.com/v1/users/")
            return res
        }
        axiosGetAllUserList()
            .then((res: any) => {
                // console.log("UserListPage", res.data.result)
                setUserList(res.data.result)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    const handleUserBlockClick = (id: string) => {
        const locationUseList = {
            pathname: `/UserPage/users/${id}`,
            state: location.state,
        }
        history.push(locationUseList)
    }
    // console.log("userList", userList);
    // console.log(history)
    return (
        <>
            <FirstTopBlock />
            <LoginOut />
            <WUserListSection>
                <WUserListContainer>
                    {
                        userList.length > 0 && userList.map((user: TUser) => {
                            return (
                                <WUserBlock key={user.id} onClick={() => handleUserBlockClick(user.id)}>
                                    {/* <Link to={`/UserPage/users/${user.id}`}> */}
                                    <WUserImg src={user.picture_url} alt="userImg" />
                                    <WUserText>{user.username}</WUserText>
                                    {/* </Link> */}
                                </WUserBlock>
                            )
                        })
                    }
                </WUserListContainer>
            </WUserListSection >
        </>

    );
}