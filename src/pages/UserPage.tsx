import React from 'react'
import styled from "styled-components"
import { useParams, Link, RouteComponentProps } from "react-router-dom"
const WUserPageSection = styled.section`
    padding-top:100px;
    padding-bottom:100px;
`

const WUserPageContainer = styled.div`
    display:flex;
    justify-content: center;
    max-width:1200px;
    margin:auto;
`

interface UserPageProps extends RouteComponentProps {

}

export const UserPage: React.FC<UserPageProps> = ({ history, location, match }) => {
    console.log("match", match);
    console.log("location", location);
    console.log("history", history);
    return (
        <WUserPageSection>
            <WUserPageContainer>
                <h1>55</h1>
            </WUserPageContainer>
        </WUserPageSection>
    );
}