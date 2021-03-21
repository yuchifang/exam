import React from 'react'
import styled from "styled-components"
import { baseGray } from "../styles/General"


export const WebTopBlock: React.FC = () => {
    return (
        <WWebTopBlock />
    );
}


const WWebTopBlock = styled.div`
    width:100%;
    height:30px;
    background-color:${baseGray};
`