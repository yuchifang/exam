import React, { useEffect, useState, useRef } from 'react'
import { baseGray } from "../styles/General"
import { Logout } from "./Header/Logout"
import { Login } from "./Header/Login"
import { WebTopBlock } from "../components/WebTopBlock"
import { RouteComponentProps, Route } from 'react-router-dom'
import { WUserText, WUserImg } from "../styles/General"
import styled from "styled-components"
import { useUser } from "../hook"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Spinner from '../components/Spinner'
import Pagination from '../components/Pagination'

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

type DefaultPageState = {
    currentPage: number,
    maxIndex: number,
    minIndex: number
}

const singlePageItemCount = 18

const defaultPageState = {
    currentPage: 1,
    maxIndex: 0,
    minIndex: 0
}

export const UserListPage: React.FC<UserListPageProps> = ({ history, location }) => {
    const { axiosGetAllUserData, axiosStatus, axiosUserListData } = useUser()
    const [searchValue, setSearchValue] = useState<string>("")
    const [userList, setUserList] = useState<TUser[] | undefined>(axiosUserListData)
    const [pageState, setPageState] = useState<DefaultPageState>(defaultPageState)
    const searchInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => { //執行api
        //抓一次資料 會render 6~7次
        axiosGetAllUserData()
    }, [])

    useEffect(() => { //將api 的值setUserList
        setUserList(axiosUserListData)
    }, [axiosUserListData])

    useEffect(() => { //搜尋功能 如果沒有搜尋Input 為空 則set原本api的資料
        //每search render 2次
        const searchList = userList !== undefined ? [...userList] : null

        let searchResult
        if (searchValue.trim() && searchList !== null) {
            searchResult = searchList.filter(item =>
                item.username.indexOf(searchValue.trim()) !== -1
            )
            if (searchResult !== undefined) {
                setUserList(searchResult)
            }
        } else {
            setUserList(axiosUserListData)
        }
    }, [searchValue])


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !!searchInputRef.current) {
            setSearchValue(searchInputRef.current.value)
            searchInputRef.current.value = ""
        }
    }

    const handleOnClick = () => {
        if (!!searchInputRef.current) {
            setSearchValue(searchInputRef.current.value)
            searchInputRef.current.value = ""
        }
    }

    const handleUserBlockClick = (id: string) => {
        if (location.state !== undefined) {

            const locationUseList = {
                pathname: `/UserInfoPage/users/${id}`,
                state: location.state,
            }
            history.push(locationUseList)
        } else {
            alert("請先登入")
        }
    }

    const handlePage = (page: number) => {
        setPageState({
            currentPage: page,
            maxIndex: singlePageItemCount * page,
            minIndex: singlePageItemCount * (page - 1)
        })
    }

    return (
        <>
            <WebTopBlock />
            {location.state === undefined && <Route component={Login} />}
            {(location.state !== undefined) && <Route component={Logout} />}
            <WUserListSection>
                <WInputBlock >
                    <WSearchText onClick={() => handleOnClick()}>
                        <FontAwesomeIcon icon={faSearch} />
                    </WSearchText>
                    <WInput
                        ref={searchInputRef}
                        type="text"
                        onKeyPress={(e) => handleKeyPress(e)}
                        placeholder="搜尋使用者" />
                </WInputBlock>
                {
                    axiosStatus === "success" &&
                    <>
                        <WUserListContainer>
                            {
                                (userList !== undefined && userList.length > 0) && userList.map((user: TUser, index: number) => {
                                    if (index < pageState.maxIndex && pageState.minIndex <= index) {
                                        return (
                                            <WUserBlock key={user.id} onClick={() => handleUserBlockClick(user.id)}>
                                                <WUserImg src={user.picture_url} alt="userImg" />
                                                <WUserText>{user.username}</WUserText>
                                            </WUserBlock>
                                        )
                                    }
                                })
                            }
                            {userList?.length === 0 && <p>沒有資料</p>}
                        </WUserListContainer>
                        {
                            (userList !== undefined && userList.length > 0 && userList.length > singlePageItemCount) &&
                            <Pagination
                                onChange={handlePage}
                                ListLength={userList.length}
                                singlePageItemCount={singlePageItemCount}
                                currentPage={pageState.currentPage}
                            />
                        }
                    </>
                }
                {axiosStatus === "loading" && <Spinner />}
            </WUserListSection >
        </>

    );
}


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
    cursor:pointer;
    padding:5px 10px;
    background-color:${baseGray};
`

