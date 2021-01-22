
import React, { useRef, useState, useEffect } from 'react'
import styled from "styled-components"
import { WUserImg, WSubmitButtom, outLineBlue } from "../../styles/General"
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

    jwtString?: string,
    username: string,
    memberId: string,
    editMode?: boolean,

}
interface EditorPageProps {
    userData?: {
        description: null | string,
        id: string,
        picture_url: string
        username: string
    }
    EditPageCancel: () => void,
    editDom: boolean | undefined,
    setEditDom: React.Dispatch<React.SetStateAction<boolean | undefined>>,
    userId: string,
    editorLocation: TLocation
}

export const EditorPage: React.FC<EditorPageProps> = ({
    userData,
    EditPageCancel,
    setEditDom,
    editDom,
    userId,
    editorLocation
}) => {
    const fileRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    const [imgUrl, setImgUrl] = useState<string>("")

    const { axiosStatus, axiosUserData, errorCode, message, axiosUpdateAccount } = useUser()


    useEffect(() => {
        if (axiosStatus === "success") {
            alert("更新成功")
            // if (axiosUserData) {
            // axiosUserData.editMode = false
            // const locationUseList = {
            //     pathname: `/UserPage/users/${axiosUserData?.memberId}`,
            //     state: axiosUserData,
            // }
            setEditDom(false)
            // }
        } else if (axiosStatus === "error") {
            alert("errorCode: " + errorCode + "message: " + message)
        }

    }, [errorCode])

    const EditPageSave = () => {

        let descripotion: string | null | undefined = !!textAreaRef?.current?.value ? textAreaRef?.current?.value : null
        let username: string | undefined = !!usernameRef?.current?.value ? usernameRef?.current?.value : editorLocation.username
        let fileData: File | undefined
        if (fileRef.current?.files !== null) {
            fileData = fileRef.current?.files[0]
            axiosUpdateAccount({ fileData, username, descripotion, userId, location: editorLocation })
        } else {
            alert("使用者名稱 為必填")
        }

    }

    const handleImgChange = () => {
        let fileData: File | undefined
        if (fileRef.current?.files !== null) {
            if (fileRef.current?.files[0]?.name !== "") {

                fileData = fileRef.current?.files[0]
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
                    <WUserTextInput required ref={usernameRef} placeholder={userData?.username} />
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