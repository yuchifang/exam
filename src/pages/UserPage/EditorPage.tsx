
import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import { useParams, Link, RouteComponentProps } from "react-router-dom"
import axios from "axios"
import { WUserText, WUserImg, WSubmitButtom, outLineBlue } from "../../styles/General"
import { Modal, Button } from "react-bootstrap";
import { LoginOut } from "../Header/LoginOut"
import { FirstTopBlock } from "../../components/FirstTopBlock"

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


interface EditorPageProps {
    userData?: {
        description: null | string,
        id: string,
        picture_url: string
        username: string
    }
    EditPageCancel: () => void,
    EditPageSave: () => void
}

export const EditorPage: React.FC<EditorPageProps> = ({
    userData,
    EditPageCancel,
    EditPageSave
}) => {

    return (
        <WUserPageSection>
            <WUserPageContainer>
                <WUserBlock>
                    <WUserImgList src={userData?.picture_url} alt="userImg" />
                    <WFileBlock>
                        <WInputFile type="file" id="file" />
                        <WLabelFile htmlFor="file" >選擇檔案</WLabelFile>
                        <WWarningSpan>上限300KB</WWarningSpan>
                    </WFileBlock>
                    <WUserTextInput placeholder={userData?.username} />
                </WUserBlock>
                <WUserDescriptionTextArea rows={4} cols={50} placeholder={!!userData?.description ? userData?.description : "type something"} />
                <WButtonBlock>
                    <WEditButton onClick={() => EditPageCancel()}>取消</WEditButton>
                    <WEditButton onClick={() => EditPageSave()}>儲存</WEditButton>
                </WButtonBlock>
            </WUserPageContainer>
        </WUserPageSection>
    );
}