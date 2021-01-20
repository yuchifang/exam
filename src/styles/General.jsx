import styled from "styled-components";
export const baseBlue = "#44f";
export const baseGray = "#89a";
export const headerBlue = "cornflowerblue"
export const outLineBlue = "dodgerblue"

export const WTag = styled.div`
    cursor:pointer;
    padding-bottom:10px;
    
    color: ${baseGray};
    
    + div {
        margin-left:15px;
    }
    &:hover{
        color: ${baseBlue};
        box-shadow:0 -3px 0 ${baseBlue} inset ;
    }
    a {
        text-decoration:none;
    }
`
export const WInput = styled.input`
    padding:8px;
    margin:7px 10px;
    border-radius: 3px;
    border:  ${baseGray} 1px solid;
    font-size:16px;
`

export const WSubmitButtom = styled.button`
    margin:5px 10px;
    margin-top: 10px;
    font-size: 15px;
    padding: 7px;
    color: white;
    background-color:${baseBlue};
    cursor:pointer;
    border: unset;
    position: relative;
    top:0px;
    right:0px;
    transition:all .3s;
    border-radius: 4px;
    &:hover{
        transform:translateY(-3px);
    }
    &:active{
        transform:translateY(-1px);
        outline:none;
    }
    &:focus{
        outline:none;
    }
`