import React from 'react'
import styled from "styled-components"
import { baseGray } from "../styles/General"

const StyledFirstTopBlock = styled.div`
    width:100%;
    height:30px;
    background-color:${baseGray};
`
interface FirstTopBlockProps {


}

export const FirstTopBlock: React.FC<FirstTopBlockProps> = ({ }) => {
    return (
        <StyledFirstTopBlock />
    );
}