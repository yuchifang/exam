import React from 'react'
import styled, { keyframes } from 'styled-components'


const rotateCircleFirst = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
const rotateCircleSecond = keyframes`
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
`


export default function Spinner() {
    return (
        <>
            <WSpinnerFirst>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </WSpinnerFirst>
            <WSpinnerSecond>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </WSpinnerSecond>
        </>
    )
}


const WSpinnerFirst = styled.div`
    display:flex;
    position:relative;
    top:250px;
    margin:0 auto;
    background-color:transparent;
    
    animation: ${rotateCircleFirst} 1s infinite linear ;
    width:10px;
    height:10px;

    >div:nth-child(1){
        top:25px;
        left: 2px;
        position: absolute;
        content:"";
        padding:3px;
        background-color:#bbb;
    };

    >div:nth-child(2){
        right: 25px;
        top: 2px;
        position: absolute;
      
        content:"";
        padding:3px;
        background-color:#ccc;
    };

    >div:nth-child(3){
        position: absolute;
        bottom:25px;
        left: 2px;
        content:"";
        padding:3px;
        background-color:#ddd;
    };

    >div:nth-child(4){
        left:25px;
        top:2px;
        position: absolute;
      
        content:"";
        padding:3px;
        background-color:#eee;
    };  
`

const WSpinnerSecond = styled.div`
    display:flex;
    position:relative;
    top:240px;
    margin:0 auto;
    background-color:transparent;
    animation: ${rotateCircleSecond} 1s infinite linear ;
    width:10px;
    height:10px;

    >div:nth-child(1){
        top:25px;
        left: 2px;
        position: absolute;
        content:"";
        padding:3px;
        background-color:#bbb;
    };

    >div:nth-child(2){
        right: 25px;
        top: 2px;
        position: absolute;
      
        content:"";
        padding:3px;
        background-color:#ccc;
    };

    >div:nth-child(3){
        position: absolute;
        bottom:25px;
        left: 2px;
        content:"";
        padding:3px;
        background-color:#ddd;
    };

    >div:nth-child(4){
        left:25px;
        top:2px;
        position: absolute;
      
        content:"";
        padding:3px;
        background-color:#eee;
    };


  
`