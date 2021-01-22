import React, { useEffect, useState } from 'react'
import { LoginOut } from "../pages/Header/LoginOut"
import { LoginIn } from "../pages/Header/LoginIn"
import { FirstTopBlock } from "../components/FirstTopBlock"
import { RouteComponentProps, Route } from 'react-router-dom'
import { WUserText, WUserImg } from "../styles/General"
import styled from "styled-components"
import { useUser } from "../hook"

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

    jwtString: string,
    memberId: string,

}
interface TUser {
    id: string,
    picture_url: string | null,
    username: string,
}

export const UserListPage: React.FC<UserListPageProps> = ({ history, location }) => {
    const { axiosUserData, axiosGetAllUserData } = useUser()
    const [userList, setUserList] = useState<TUser[]>([])

    useEffect(() => {
        axiosGetAllUserData()
            .then((res: any) => {
                setUserList(res)
            }).catch((err) => {
                console.log(err)
            })
    }, [axiosUserData])

    const handleUserBlockClick = (id: string) => {
        if (location.state !== undefined) {

            const locationUseList = {
                pathname: `/UserPage/users/${id}`,
                state: location.state,
            }
            history.push(locationUseList)
        } else {
            alert("請先登入")
        }
    }

    return (
        <>
            <FirstTopBlock />
            {location.state === undefined && <Route component={LoginIn} />}
            {(location.state !== undefined) && <Route component={LoginOut} />}
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