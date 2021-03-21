import React from 'react'
import styled from "styled-components"
import { baseGray } from "../styles/General"


export const FirstTopBlock: React.FC = () => {
    return (
        <WFirstTopBlock />
    );
}


const WFirstTopBlock = styled.div`
    width:100%;
    height:30px;
    background-color:${baseGray};
`