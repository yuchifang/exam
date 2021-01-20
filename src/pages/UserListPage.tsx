import React, { useEffect, useState } from 'react'
import { LoginOut } from "../pages/Header/LoginOut"
import { FirstTopBlock } from "../components/FirstTopBlock"
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import axios from "axios"
import styled from "styled-components"

const WUserListSection = styled.section`
    padding-top:100px;
    padding-bottom:100px;
    // display:flex;
    // width:100%;
    // background-color:#aaa;
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

const WUserImg = styled.img.attrs((props: any) => ({
    src: props.src ? props.src : "https://fakeimg.pl/250x250/aaa/000/?text=fakeImg",
}))`
    border-radius: 50%;
    height:150px;
    width:150px;
    text-align: center;
`
const WUserText = styled.div`
    margin-top:20px;
    text-align: center;
    font-size: 20px;
    
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
                console.log(res.data.result)
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
                                        <Link to={`/UserListPage/users/${user.id}`}>
                                            <WUserImg src={user.picture_url} alt="userImg" />
                                            <WUserText>{user.username}</WUserText>
                                        </Link>
                                    </WUserBlock>
                                )
                            })
                        }
                    </WUserListContainer>
                </WUserListSection >
                <Switch>
                    <Route path="/UserListPage/users/:userId" />
                </Switch>
            </BrowserRouter>
        </>

    );
}