import React, { useEffect, useState } from 'react'
import { baseGray } from "../styles/General"
import { LoginOut } from "../pages/Header/LoginOut"
import { LoginIn } from "../pages/Header/LoginIn"
import { FirstTopBlock } from "../components/FirstTopBlock"
import { RouteComponentProps, Route } from 'react-router-dom'
import { WUserText, WUserImg } from "../styles/General"
import styled from "styled-components"
import { useUser } from "../hook"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Spinner, Jumbotron, Container, Row } from "react-bootstrap";


const WUserListSection = styled.section`
    padding-top:100px;
    padding-bottom:100px;
    text-align: center;
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
const WInputBlock = styled.div`
    overflow: hidden;
    margin:  0 0 30px 0;
    border-radius: 5px;
    display: inline-block;
`

const WInput = styled.input`
    border-radius: 0px 5px 5px 0px;
    padding-left:5px;
`

const WSearchText = styled.span`
    padding:5px 10px;
    background-color:${baseGray};
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
    const { axiosGetAllUserData, axiosStatus, userListData } = useUser()
    const [seachValue, setSeachValue] = useState<string>("")
    const [userList, setUserList] = useState<TUser[] | undefined>(userListData)

    useEffect(() => { //執行api
        //抓一次資料 會render 6~7次
        axiosGetAllUserData()
    }, [])

    useEffect(() => { //將api 的值setUserList
        setUserList(userListData)
    }, [userListData])

    useEffect(() => { //搜尋功能 如果沒有搜尋Input 為空 則set原本api的資料
        //每search render 2次
        const searchList = userList !== undefined ? [...userList] : null

        let searchResult
        if (seachValue.trim() && searchList !== null) {
            searchResult = searchList.filter(item =>
                item.username.indexOf(seachValue.trim()) !== -1
            )
            if (searchResult !== undefined) {
                setUserList(searchResult)
            }
        } else {
            setUserList(userListData)
        }
    }, [seachValue])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSeachValue(e.target.value)
    }

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
                <WInputBlock >
                    <WSearchText>
                        <FontAwesomeIcon icon={faSearch} />
                    </WSearchText>
                    <WInput type="text" onChange={handleChange} value={seachValue} placeholder="搜尋使用者" />
                </WInputBlock>
                {axiosStatus === "success" &&
                    <WUserListContainer>
                        {
                            (userList !== undefined && userList.length > 0) && userList.map((user: TUser) => {
                                return (
                                    <WUserBlock key={user.id} onClick={() => handleUserBlockClick(user.id)}>
                                        <WUserImg src={user.picture_url} alt="userImg" />
                                        <WUserText>{user.username}</WUserText>
                                    </WUserBlock>
                                )
                            })
                        }
                        {userList?.length === 0 && <p>沒有資料</p>}
                    </WUserListContainer>}
                {axiosStatus === "loading" &&
                    <Container>
                        <Row className="justify-content-center">
                            <Spinner size="sm" animation="border" />
                        </Row>
                    </Container>}
            </WUserListSection >
        </>

    );
}