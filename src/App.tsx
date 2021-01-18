import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import { HomePage } from "./HomePage"
import "./styles/reset.scss"
const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/LoginPage/login" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
