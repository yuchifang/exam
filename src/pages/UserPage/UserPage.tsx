import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { RouteComponentProps, Route } from "react-router-dom"
import { Spinner, Jumbotron, Container, Row } from "react-bootstrap"
import { WUserText, WUserImg, WSubmitButtom, outLineBlue } from "../../styles/General"
import { Modal, Button } from "react-bootstrap";
import { LoginOut } from "../Header/LoginOut"
import { FirstTopBlock } from "../../components/FirstTopBlock"
import { EditorPage } from "./EditorPage"
import { useUser } from "../../hook"

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

const WEditButton = styled(WSubmitButtom)`
    background-color:white;
    color: ${outLineBlue};
    border:solid 1px  ${outLineBlue};
    &:hover{
        background-color:${outLineBlue};
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


interface TLocation {

    jwtString?: string,
    username: string,
    memberId: string,
    editMode?: boolean,

}
interface UserPageProps extends RouteComponentProps<{ userId: string }, {}, TLocation> {

}

interface UserData {
    description: null | string,
    id: string,
    picture_url: string
    username: string
}


export const UserPage: React.FC<UserPageProps> = ({ history, location, match }) => {
    const [showLightBox, setShowLightBox] = useState(false);
    const [editDom, setEditDom] = useState(location?.state?.editMode);
    const [lightBoxText, setLightBoxText] = useState("")

    const { axiosStatus, axiosUserData, errorCode, message, userData, axiosGetSigleUserData, axiosDeleteUserData } = useUser()

    const { userId } = match.params


    const userEqualtoEditor = userId === location.state.memberId
    const { state } = location
    useEffect(() => {
        axiosGetSigleUserData(userId)

    }, [userId, editDom])

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

    const closeDeleteLightBox = () => setShowLightBox(false);

    const openLightBox = (text: string) => {
        setShowLightBox(true)
        setLightBoxText(text)
    }

    const lightBoxDeleteConfirm = () => {
        setShowLightBox(false)
        axiosDeleteUserData({ userId, jwtString: state.jwtString })
    }

    const lightBoxEditConfirm = () => {
        setShowLightBox(false)
        setEditDom(true)
    }

    const EditPageCancel = () => {
        setEditDom(false)
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
                    <WEditButton onClick={() => openLightBox("編輯")}>編輯</WEditButton>
                    <WDeleteUser onClick={() => openLightBox("刪除")}>刪除此使用者</WDeleteUser>
                </WButtonBlock>
            </WUserPageContainer>
        </WUserPageSection>
    </>
    return (
        <>
            <FirstTopBlock />
            <Route component={LoginOut} />
            {axiosStatus === "success" && !editDom && <UserPage />}
            {!!editDom &&
                <EditorPage
                    userId={userId}
                    userData={userData}
                    EditPageCancel={EditPageCancel}
                    editDom={editDom}
                    setEditDom={setEditDom}
                    editorLocation={state}


                />}
            {axiosStatus === "loading" &&
                <Container>
                    <Row className="justify-content-center">
                        <Jumbotron>
                            <Spinner size="sm" animation="border" />
                        </Jumbotron>
                    </Row>
                </Container>
            }
            <LightBox //render props?
                lightBoxText={lightBoxText}
                show={showLightBox}
                closeDeleteLightBox={closeDeleteLightBox}
                userEqualEditor={userEqualtoEditor}
                lightBoxDeleteConfirm={lightBoxDeleteConfirm}
                lightBoxEditConfirm={lightBoxEditConfirm} />
        </>
    );
}

const LightBox = ({ lightBoxText, show, userEqualEditor, closeDeleteLightBox, lightBoxDeleteConfirm, lightBoxEditConfirm }:
    {
        lightBoxText: string,
        show: boolean,
        userEqualEditor: boolean,
        closeDeleteLightBox: () => void,
        lightBoxDeleteConfirm: () => void,
        lightBoxEditConfirm: () => void,
    }) => (
    <Modal show={show} onHide={closeDeleteLightBox}>
        <Modal.Header closeButton>
            {userEqualEditor && <Modal.Title>{lightBoxText}此使用者</Modal.Title>}
            {!userEqualEditor && <Modal.Title>你非此使用者　無法{lightBoxText}</Modal.Title>}
        </Modal.Header>
        <Modal.Footer>
            <Button variant="secondary" onClick={closeDeleteLightBox}>取消</Button>
            {userEqualEditor && lightBoxText === "刪除" &&
                < Button variant="danger" onClick={lightBoxDeleteConfirm}>確認</Button>}
            {userEqualEditor && lightBoxText === "編輯" &&
                < Button variant="danger" onClick={lightBoxEditConfirm}>確認</Button>}
        </Modal.Footer>
    </Modal >
)