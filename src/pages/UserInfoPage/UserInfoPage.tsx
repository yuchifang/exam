import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { RouteComponentProps, Route } from "react-router-dom"
import { WUserText, WUserImg, WSubmitButton, Blue400 } from "../../styles/General"
import { Modal, Button } from "react-bootstrap";
import { Logout } from "../Header/Logout"
import { WebTopBlock } from "../../components/WebTopBlock"
import { EditorPage } from "./EditorPage"
import { useUser } from "../../hook"
import Spinner from '../../components/Spinner'

interface TLocation {

    jwtString?: string,
    username: string,
    memberId: string,
    editMode?: boolean,

}
interface UserInfoPageProps extends RouteComponentProps<{ userId: string }, {}, TLocation> {

}

export const UserInfoPage: React.FC<UserInfoPageProps> = ({ history, location, match }) => {
    const [isLightBoxVisible, setIsLightBoxVisible] = useState(false);
    const [isEditAble, setIsEditAble] = useState(location?.state?.editMode);
    const [lightBoxButtonText, setLightBoxButtonText] = useState("")

    const { axiosStatus, axiosUserData, errorCode, message, userData, axiosGetSingleUserData, axiosDeleteUserData } = useUser()

    const { userId } = match.params
    const hasAuthority = userId === location.state.memberId
    const { state } = location


    useEffect(() => {

        axiosGetSingleUserData(userId)

    }, [userId, isEditAble])

    useEffect(() => {
        if (axiosStatus === "success") {
            if (message === "delete the member successfully") {
                alert("刪除成功")
                const locationState = {
                    pathname: "/UserListPage/users",
                    state: axiosUserData
                }
                history.push(locationState)
            }
        } else if (axiosStatus === "error") {
            alert("errorCode: " + errorCode + "message: " + message)
        }
    }, [axiosStatus])


    const handleEdit = () => {

        if (hasAuthority) {
            setIsEditAble(true)
        }

        if (!hasAuthority) {
            setIsLightBoxVisible(true)
            setLightBoxButtonText("編輯")
        }
    }

    const handleDelete = () => {
        setIsLightBoxVisible(true)
        setLightBoxButtonText("刪除")
    }


    const lightBoxCancelConfirm = () => {
        setIsLightBoxVisible(false)
        axiosDeleteUserData({ userId, jwtString: state.jwtString })
    }


    const cancelEditPage = () => {
        setIsEditAble(false)
    }

    const UserPage = () => <>
        <WUserPageSection>
            <WUserPageContainer>
                <WUserBlock>
                    <WUserImgList src={userData?.picture_url} alt="userImg" />
                    <WUserText>username: {userData?.username}</WUserText>
                </WUserBlock>
                <WUserDescription>description:
                    {!!userData?.description === false && " no description here"}
                    {!!userData?.description === true && userData?.description}
                </WUserDescription>
                <WButtonBlock>
                    {/* 下次遇到可以考慮用disable 來控制 */}
                    <WEditButton onClick={() => handleEdit()}>編輯</WEditButton>
                    <WDeleteUser onClick={() => handleDelete()}>刪除此使用者</WDeleteUser>
                </WButtonBlock>
            </WUserPageContainer>
        </WUserPageSection>
    </>


    return (
        <>
            <WebTopBlock />
            <Route component={Logout} />
            {
                axiosStatus === "success" && <>

                    {!isEditAble && <UserPage />}

                    {!!isEditAble && <>
                        {
                            hasAuthority &&
                            <EditorPage
                                userId={userId}
                                userData={userData}
                                onCancel={cancelEditPage}
                                editDom={isEditAble}
                                setEditDom={setIsEditAble}
                                editorLocation={state}
                            />
                        }
                    </>
                    }
                </>
            }
            {axiosStatus === "loading" && <Spinner />}
            {
                hasAuthority &&
                <Modal show={isLightBoxVisible} onHide={() => setIsLightBoxVisible(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{lightBoxButtonText}此使用者</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsLightBoxVisible(false)}>取消</Button>
                        {
                            lightBoxButtonText === "刪除" &&
                            < Button variant="danger" onClick={lightBoxCancelConfirm}>確認</Button>
                        }
                    </Modal.Footer>
                </Modal >
            }
            {
                !hasAuthority &&
                <Modal show={isLightBoxVisible} onHide={() => setIsLightBoxVisible(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>你非此使用者　無法{lightBoxButtonText}</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setIsLightBoxVisible(false)}>取消</Button>
                    </Modal.Footer>
                </Modal >
            }
        </>
    );
}

const WUserPageSection = styled.section`
    padding-top:100px;
    padding-bottom:100px;
`

const WUserPageContainer = styled.div`
    display:flex;
    justify-content: center;
    max-width:1000px;
    margin:auto;
    flex-direction: column;
    align-items: center;
    padding: 0 150px;
`

const WUserImgList = styled(WUserImg)`
    margin: 0 auto 20px auto;
    
`

const WUserBlock = styled.figure`
    display: flex;
    flex-direction: column;
`

const WUserDescription = styled.article`
    font-size:16px;
`

const WButtonBlock = styled.div`

`

const WEditButton = styled(WSubmitButton)`
    background-color:white;
    color: ${Blue400};
    border:solid 1px  ${Blue400};
    &:hover{
        background-color:${Blue400};
        color:white;
    }
`

const WDeleteUser = styled.a`
    color:red;
    &:hover {
        color:red;
        cursor:pointer;
    }
`