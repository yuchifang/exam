import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { FirstTopBlock } from "./components/FirstTopBlock"
interface HomePageProps {

}

export const HomePage: React.FC<HomePageProps> = ({ }) => {
    return (
        <BrowserRouter>
            <FirstTopBlock />
            <Switch>
                {/* <h1>5555555</h1>
                <Route path="/" component={HomePage} /> */}
            </Switch>
        </BrowserRouter >
    );
}