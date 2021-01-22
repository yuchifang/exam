
import React, { useRef, useState } from 'react'
import styled from "styled-components"
// import { useParams, Link, RouteComponentProps } from "react-router-dom"
import axios from "axios"
import { WUserImg, WSubmitButtom, outLineBlue } from "../../styles/General"
// import { Modal, Button } from "react-bootstrap";
// import { LoginOut } from "../Header/LoginOut"
// import { FirstTopBlock } from "../../components/FirstTopBlock"

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
    username: string,
    memberId: string,
    // state?: {
    //     jwtString: string
    // } | undefined
}
interface EditorPageProps {
    userData?: {
        description: null | string,
        id: string,
        picture_url: string
        username: string
    }
    EditPageCancel: () => void,
    editDom: boolean,
    setEditDom: React.Dispatch<React.SetStateAction<boolean>>,
    userId: string,
    location: TLocation
}

export const EditorPage: React.FC<EditorPageProps> = ({
    userData,
    EditPageCancel,
    setEditDom,
    editDom,
    userId,
    location
}) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [imgUrl, setImgUrl] = useState<string>("")

    const EditPageSave = async () => {
        //-------deal file
        let fileData: File | undefined
        if (fileRef.current?.files !== null) {
            fileData = fileRef.current?.files[0]
        }
        console.log("fileData", fileData)
        const dataUrl: any = await getReadAsDataURL(fileData)
        console.log("arrayBufferURL", dataUrl)
        function getReadAsDataURL(file: any) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    resolve(reader.result);
                });
                reader.readAsDataURL(file);
            })
        }

        const axiosUpdate = async (arrayBuffer: any) => {

            const res = axios.post(`https://weblab-react-special-midtern.herokuapp.com/v1/users/${userId}`, {
                username: usernameRef?.current?.value,
                description: null,
                pictureUrl: arrayBuffer
            }, {
                headers: {
                    Authorization: `Bearer ${location.jwtString} `
                },
            })
            return res
        }
        console.log("userId", userId)
        console.log("location", location)
        console.log("usernameRef?.current?.value,", usernameRef?.current?.value)
        console.log("usernameRef?.current?.value,", typeof usernameRef?.current?.value)
        console.log("textAreaRef?.current?.value", typeof textAreaRef?.current?.value)
        console.log("dataUrl", dataUrl)
        axiosUpdate(dataUrl)
            .then((res) => {
                console.log("res", res)
            })
            .catch((err) => {
                console.log("err", err)
            })
    }


    // const arrayBuffer = await getArrayBuffer(fileRef?.current?.files[0]);
    // console.log('arrayBuffer', arrayBuffer);
    // const response = await uploadFile(arrayBuffer);
    // console.log('response', response);

    // function uploadFile(arrayBuffer) {
    //     return fetch(`https://api.foobar.io`, {
    //         method: 'POST',

    //         // STEP 6：使用 JSON.stringify() 包起來送出
    //         body: JSON.stringify({
    //             appId: 3,
    //             format: 'png',

    //             // STEP 4：轉成 Uint8Array（這是 TypedArray）
    //             // STEP 5：透過 Array.from 轉成真正的陣列
    //             icon: Array.from(new Uint8Array(arrayBuffer)),
    //         }),
    //     }).then((res) => {
    //         if (!res.ok) {
    //             throw res.statusText;
    //         }
    //         return res.json()
    //     })
    //         .then(({ data }) => console.log('data', data))
    //         .catch(err => console.log('err', err))
    // }

    const handleImgChange = () => {
        let fileData: File | undefined
        if (fileRef.current?.files !== null) {
            if (fileRef.current?.files[0]?.name !== "") {

                fileData = fileRef.current?.files[0]
                console.log("fileData", fileData)
                if (fileData?.size !== undefined && fileData?.size < 300000) {
                    setImgUrl(URL.createObjectURL(fileData))
                } else {
                    alert("上傳失敗　圖片請勿超過３００ＫＢ")
                }
            }
        }
    }

    let userImgUrl = imgUrl ? imgUrl : userData?.picture_url

    return (
        <WUserPageSection>
            <WUserPageContainer>
                <WUserBlock>
                    <WUserImgList src={userImgUrl} alt="userImg" />
                    <WFileBlock>
                        <WInputFile onChange={() => handleImgChange()} accept="image/*" ref={fileRef} type="file" id="file" />
                        <WLabelFile htmlFor="file" >選擇檔案</WLabelFile>
                        <WWarningSpan>上限300KB</WWarningSpan>
                    </WFileBlock>
                    <WUserTextInput ref={usernameRef} placeholder={userData?.username} />
                </WUserBlock>
                <WUserDescriptionTextArea ref={textAreaRef} rows={4} cols={50} placeholder={!!userData?.description ? userData?.description : "type something"} />
                <WButtonBlock>
                    <WEditButton onClick={() => EditPageCancel()}>取消</WEditButton>
                    <WEditButton onClick={() => EditPageSave()}>儲存</WEditButton>
                </WButtonBlock>
            </WUserPageContainer>
        </WUserPageSection>
    );
}