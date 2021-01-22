import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { RouteComponentProps } from "react-router-dom"
import axios from "axios"
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
    // hash: string | undefined
    // key: string | undefined
    // pathname: string | undefined
    // search: string | undefined
    jwtString?: string,
    username: string,
    memberId: string,
    editMode?: boolean,
    // state?: {
    //     jwtString: string
    // } | undefined
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
    // const [userData, setUserData] = useState<UserData>()
    const [getDataStatus, setGetDataStatus] = useState("idle")
    const [lightBoxText, setLightBoxText] = useState("")

    const { axiosStatus, axiosUserData, errorCode, message, userData, axiosGetSignUserData, axiosDeleteUserData } = useUser()

    const { userId } = match.params


    const userEqualtoEditor = userId === location.state.memberId
    const { state } = location
    useEffect(() => {
        axiosGetSignUserData(userId)

    }, [userId, editDom])

    console.log("axiosStatus", axiosStatus)
    console.log([message])
    console.log(errorCode)
    console.log("editDom", editDom)

    useEffect(() => {
        console.log("errorCode", errorCode)
        if (axiosStatus === "success") {
            console.log("success")
            console.log("userData", userData)
            console.log([message])
            if (message === "delete the member successfully") {
                alert("deletesuccess")
                const locationState = {
                    pathname: "/UserListPage/users",
                    state: axiosUserData
                }
                history.push(locationState)
            }
        } else if (axiosStatus === "error") {
            alert("errorCode: " + errorCode + "message: " + message)
        }
    }, [errorCode])

    const closeDeleteLightBox = () => setShowLightBox(false);

    const openLightBox = (text: string) => {
        setShowLightBox(true)
        setLightBoxText(text)
    }

    const lightBoxDeleteConfirm = () => {
        setShowLightBox(false)
        axiosDeleteUserData({ userId, jwtString: state.jwtString })
        //    const location = {
        //         pathname: "/UserListPage/users",
        //         state: axiosUserData
        //     }
        //     history.push(location)
        //---------------------
        // const axiosDeleteData = async () => {
        //     const res = await axios.delete(`https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`, {
        //         headers: {
        //             Authorization: `Bearer ${state.jwtString} `
        //         }
        //     })
        //     return res
        // }
        // axiosDeleteData()
        //     .then((res) => {
        //         console.log("ressss", res)
        //     })
        //     .catch((err) => {
        //         console.log("err", err)
        //     })
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
                    <WUserText>{userData?.username}</WUserText>
                </WUserBlock>
                <WUserDescription>
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
            <LoginOut />
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
            {getDataStatus === "loading" && <h1>loading</h1>}
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