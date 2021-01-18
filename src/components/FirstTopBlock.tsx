import React from 'react'
import styled from "styled-components"
interface FirstTopBlockProps {

}

const StyledFirstTopBlock = styled.div`
    width:100vw;
    height:30px;
    background-color:#aaa;
`
export const FirstTopBlock: React.FC<FirstTopBlockProps> = ({ }) => {
    return (
        <StyledFirstTopBlock />
    );
}