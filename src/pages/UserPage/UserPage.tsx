import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useParams, Link, RouteComponentProps } from "react-router-dom"
import axios from "axios"
import { WUserText, WUserImg, WSubmitButtom, outLineBlue } from "../../styles/General"
import { Modal, Button } from "react-bootstrap";
import { LoginOut } from "../Header/LoginOut"
import { FirstTopBlock } from "../../components/FirstTopBlock"
import { EditorPage } from "./EditorPage"


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
const WFileBlock = styled.div`
    display:flex;
    align-items: baseline;    
`

const WWarningSpan = styled.span`
    margin-left:10px;
`

const WInputFile = styled.input`
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
`

const WLabelFile = styled.label`
    border: solid #222 1px;
    padding:5px 8px;
    border-radius: 5px; 
    cursor:pointer;
`

const WUserTextInput = styled.input`

`
const WUserDescriptionTextArea = styled.textarea`

`

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
    const [editDom, setEditDom] = useState(false);
    const [userData, setUserData] = useState<UserData>()
    const [getDataStatus, setGetDataStatus] = useState("idle")
    const [lightBoxText, setLightBoxText] = useState("")


    const { userId } = match.params
    const userEqualEditor = userId === location.state.memberId && userData?.username === location.state.name

    useEffect(() => {
        const axiosGetUserData = async () => {
            setGetDataStatus("loading")
            const res = await axios.get(`https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`)
            return res
        }
        axiosGetUserData()
            .then((res) => {
                setUserData(res.data.result)
                console.log("res", res)
            })
            .then(() => {
                setGetDataStatus("success")
            })
            .catch((err) => {
                setGetDataStatus("error")
                console.log(err)
            })

    }, [])

    const closeDeleteLightBox = () => setShowLightBox(false);

    const openLightBox = (text: string) => {
        setShowLightBox(true)
        setLightBoxText(text)
    }

    const lightBoxDeleteConfirm = () => {
        setShowLightBox(false)
        const axiosDeleteData = async () => {
            const res = await axios.delete(`https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${1} `
                }
            })
            return res
        }
        axiosDeleteData()
            .then((res) => {
                console.log("ressss", res)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }

    const lightBoxEditConfirm = () => {
        setShowLightBox(false)
        setEditDom(true)
    }

    const EditPageCancel = () => {
        setEditDom(false)
    }

    const EditPageSave = () => {

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
            {getDataStatus === "success" && !editDom && <UserPage />}
            {!!editDom && <EditorPage
                userData={userData}
                EditPageCancel={EditPageCancel}
                EditPageSave={EditPageSave}
            />}
            {getDataStatus === "loading" && <h1>loading</h1>}
            <LightBox //render props?
                lightBoxText={lightBoxText}
                show={showLightBox}
                closeDeleteLightBox={closeDeleteLightBox}
                userEqualEditor={userEqualEditor}
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