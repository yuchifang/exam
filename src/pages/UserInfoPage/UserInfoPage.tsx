import React, { useEffect, useState, useMemo } from 'react'
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
    const [lightBoxStatus, setLightBoxStatus] = useState(false);
    const [isEditMode, setIsEditStatus] = useState(location?.state?.editMode);
    const [lightBoxButtonText, setLightBoxButtonText] = useState("")

    const { axiosStatus, axiosUserData, errorCode, message, userData, axiosGetSingleUserData, axiosDeleteUserData } = useUser()

    const { userId } = match.params
    const hasEditAuthority = userId === location.state.memberId
    const { state } = location

    useEffect(() => {

        axiosGetSingleUserData(userId)

    }, [userId, isEditMode])

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

    const closeLightBox = () => setLightBoxStatus(false);

    const openLightBox = (text: string) => {
        if (hasEditAuthority && text === "編輯") {
            setIsEditStatus(true)
        } else {
            setLightBoxStatus(true)
            setLightBoxButtonText(text)
        }

    }

    const lightBoxCancelConfirm = () => {
        setLightBoxStatus(false)
        axiosDeleteUserData({ userId, jwtString: state.jwtString })
    }

    const lightBoxEditConfirm = () => {
        setLightBoxStatus(false)
        setIsEditStatus(true)
    }

    const cancelEditPage = () => {
        setIsEditStatus(false)
    }

    const UserPage = useMemo(() =>
        <>
            <WUserPageSection>
                <WUserPageContainer>
                    <WUserBlock>
                        <WUserImgList src={userData?.picture_url} alt="userImg" />
                        <WUserText>username__{userData?.username}</WUserText>
                    </WUserBlock>
                    <WUserDescription>description__
                    {!!userData?.description === false && "no description here"}
                        {!!userData?.description === true && userData?.description}
                    </WUserDescription>
                    <WButtonBlock>
                        {/* 下次遇到可以考慮用disable 來控制 */}
                        <WEditButton onClick={() => openLightBox("編輯")}>編輯</WEditButton>
                        <WDeleteUser onClick={() => openLightBox("刪除")}>刪除此使用者</WDeleteUser>
                    </WButtonBlock>
                </WUserPageContainer>
            </WUserPageSection>
        </>
        , [])


    return (
        <>
            <WebTopBlock />
            <Route component={Logout} />
            {axiosStatus === "success" && !isEditMode && UserPage}

            {axiosStatus === "success" && !!isEditMode &&
                <EditorPage
                    userId={userId}
                    userData={userData}
                    onCancel={cancelEditPage}
                    editDom={isEditMode}
                    setEditDom={setIsEditStatus}
                    editorLocation={state}


                />
            }
            {axiosStatus === "loading" && <Spinner />}

            {
                hasEditAuthority &&
                <Modal show={lightBoxStatus} onHide={closeLightBox}>
                    <Modal.Header closeButton>
                        {hasEditAuthority && <Modal.Title>{lightBoxButtonText}此使用者</Modal.Title>}
                        {!hasEditAuthority && <Modal.Title>你非此使用者　無法{lightBoxButtonText}</Modal.Title>}
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeLightBox}>取消</Button>
                        {
                            hasEditAuthority && lightBoxButtonText === "刪除" &&
                            < Button variant="danger" onClick={lightBoxCancelConfirm}>確認</Button>
                        }
                        {
                            hasEditAuthority && lightBoxButtonText === "編輯" &&
                            < Button variant="danger" onClick={lightBoxEditConfirm}>確認</Button>
                        }
                    </Modal.Footer>
                </Modal >
            }
            {
                !hasEditAuthority &&
                <Modal show={lightBoxStatus} onHide={closeLightBox}>
                    <Modal.Header closeButton>
                        {hasEditAuthority && <Modal.Title>{lightBoxButtonText}此使用者</Modal.Title>}
                        {!hasEditAuthority && <Modal.Title>你非此使用者　無法{lightBoxButtonText}</Modal.Title>}
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeLightBox}>取消</Button>
                        {
                            hasEditAuthority && lightBoxButtonText === "刪除" &&
                            < Button variant="danger" onClick={lightBoxCancelConfirm}>確認</Button>
                        }
                        {
                            hasEditAuthority && lightBoxButtonText === "編輯" &&
                            < Button variant="danger" onClick={lightBoxEditConfirm}>確認</Button>
                        }
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