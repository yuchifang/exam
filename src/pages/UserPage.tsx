import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useParams, Link, RouteComponentProps } from "react-router-dom"
import axios from "axios"
import { WUserText, WUserImg, WSubmitButtom, outLineBlue } from "../styles/General"
import { Modal, Button } from "react-bootstrap";
import { LoginOut } from "../pages/Header/LoginOut"
import { FirstTopBlock } from "../components/FirstTopBlock"


const WUserPageSection = styled.section`
    padding-top:100px;
    padding-bottom:100px;
`

const WUserPageContainer = styled.div`
    display:flex;
    justify-content: center;
    max-width:1200px;
    margin:auto;
    flex-direction: column;
    align-items: center;
`

const WUserBlock = styled.figure`
    cursor:pointer;

`
const WUserDescription = styled.article`
    font-size:16px;
`

const WButtonBlock = styled.div`
    
`

const WEditButton = styled(WSubmitButtom)`
    background-color:white;
    color: ${outLineBlue};
    border:solid 1px  ${outLineBlue}
`

const WDeleteUser = styled.a`
    color:red;
    &:hover {
        color:red;
        cursor:pointer;
    }
`

interface UserPageProps extends RouteComponentProps<{ userId: string }> {

}
interface UserData {
    description: null | string,
    id: string,
    picture_url: string
    username: string
}

export const UserPage: React.FC<UserPageProps> = ({ history, location, match }) => {
    const [show, setShow] = useState(false);
    const [userData, setUserData] = useState<UserData>()
    const [getDataStatus, setGetDataStatus] = useState("idle")
    let { userId } = match.params
    console.log("location", location)

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




    // console.log("match", match);
    // console.log("location", location);
    // console.log("history", history);
    // console.log("userId", userId)
    // console.log("userData", userData)

    const handleClose = () => setShow(false);

    const handleOpenLightBox = (userId: string) => {
        setShow(true)
    }

    const handleConfirm = () => {
        setShow(false)
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


    return (
        <>
            {getDataStatus === "success" && (
                <>
                    <FirstTopBlock />
                    <LoginOut />
                    <WUserPageSection>
                        <WUserPageContainer>
                            <WUserBlock>
                                <WUserImg src={userData?.picture_url} alt="userImg" />
                                <WUserText>{userData?.username}</WUserText>
                            </WUserBlock>
                            <WUserDescription>
                                {!!userData?.description === false && "no description here"}
                                {!!userData?.description === true && userData?.description}
                            </WUserDescription>
                            <WButtonBlock>
                                <WEditButton>編輯</WEditButton>
                                <WDeleteUser onClick={() => handleOpenLightBox(userId)}>刪除此使用者</WDeleteUser>
                            </WButtonBlock>
                        </WUserPageContainer>
                    </WUserPageSection>
                </>
            )}
            {getDataStatus === "loading" && <h1>loading</h1>}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>刪除此使用者</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                     </Button>
                    <Button variant="danger" onClick={handleConfirm}>
                        確認
                     </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}