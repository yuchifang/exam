import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { RouteComponentProps, Route } from "react-router-dom"
import { Jumbotron, Container, Row } from "react-bootstrap"
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
interface UserPageProps extends RouteComponentProps<{ userId: string }, {}, TLocation> {

}

export const UserPage: React.FC<UserPageProps> = ({ history, location, match }) => {
    const [lightBoxStatus, setLightBoxStatus] = useState(false);
    const [editStatus, setEditStatus] = useState(location?.state?.editMode);
    const [lightBoxButtonText, setLightBoxButtonText] = useState("")

    const { axiosStatus, axiosUserData, errorCode, message, userData, axiosGetSingleUserData, axiosDeleteUserData } = useUser()

    const { userId } = match.params


    const editAuthority = userId === location.state.memberId
    const { state } = location

    useEffect(() => {
        axiosGetSingleUserData(userId)

    }, [userId, editStatus])

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
        if (editAuthority && text === "編輯") {
            setEditStatus(true)
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
        setEditStatus(true)
    }

    const cancelEditPage = () => {
        setEditStatus(false)
    }

    const UserPage = () => <>
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


    return (
        <>
            <WebTopBlock />
            <Route component={Logout} />
            {axiosStatus === "success" && !editStatus && <UserPage />}

            {axiosStatus === "success" && !!editStatus &&
                <EditorPage
                    userId={userId}
                    userData={userData}
                    cancelEditPage={cancelEditPage}
                    editDom={editStatus}
                    setEditDom={setEditStatus}
                    editorLocation={state}


                />}
            {axiosStatus === "loading" && <Spinner />}
            <LightBox //render props?
                lightBoxText={lightBoxButtonText}
                show={lightBoxStatus}
                closeLightBox={closeLightBox}
                editAuthority={editAuthority}
                lightBoxDeleteConfirm={lightBoxCancelConfirm}
                lightBoxEditConfirm={lightBoxEditConfirm} />

        </>
    );
}

const LightBox = ({ lightBoxText, show, editAuthority, closeLightBox: closeDeleteLightBox, lightBoxDeleteConfirm, lightBoxEditConfirm }:
    {
        lightBoxText: string,
        show: boolean,
        editAuthority: boolean,
        closeLightBox: () => void,
        lightBoxDeleteConfirm: () => void,
        lightBoxEditConfirm: () => void,
    }) => (
    <Modal show={show} onHide={closeDeleteLightBox}>
        <Modal.Header closeButton>
            {editAuthority && <Modal.Title>{lightBoxText}此使用者</Modal.Title>}
            {!editAuthority && <Modal.Title>你非此使用者　無法{lightBoxText}</Modal.Title>}
        </Modal.Header>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteLightBox}>取消</Button>
            {
                editAuthority && lightBoxText === "刪除" &&
                < Button variant="danger" onClick={lightBoxDeleteConfirm}>確認</Button>
            }
            {
                editAuthority && lightBoxText === "編輯" &&
                < Button variant="danger" onClick={lightBoxEditConfirm}>確認</Button>
            }
        </Modal.Footer>
    </Modal >
)

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