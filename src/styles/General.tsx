import styled, { css } from "styled-components";
export const purpleBlue = "#44f";
export const baseGray = "#89a";
export const Blue600 = "cornflowerblue"
export const Blue400 = "dodgerblue"
//
export const Button = css`
    color: ${Blue400};
    cursor:pointer;
    border: 2px solid ${Blue400};
    &:active{
        border: 2px solid ${Blue600};
        background-color: #ddd;
`

export const WTag = styled.div`
    cursor:pointer;
    padding-bottom:10px;
    
    color: ${baseGray};
    
    + div {
        margin-left:15px;
    }
    &:hover{
        color: ${purpleBlue};
        box-shadow:0 -3px 0 ${purpleBlue} inset ;
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

export const WSubmitButton = styled.button`
    margin:5px 10px;
    margin-top: 10px;
    font-size: 15px;
    padding: 7px;
    color: white;
    background-color:${purpleBlue};
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

export const WUserImg = styled.img.attrs((props: any) => ({
    src: props.src ? props.src : "https://fakeimg.pl/250x250/aaa/000/?text=fakeImg",
}))`
    border-radius: 50%;
    height:150px;
    width:150px;
    text-align: center;
`
export const WUserText = styled.div`
    margin-top:20px;
    text-align: center;
    font-size: 20px;
    
`


