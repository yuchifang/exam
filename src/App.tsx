import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import { HomePage } from "./pages/HomePage/HomePage"
import { UserPage } from "./pages/UserPage/UserPage"
import "./styles/reset.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserListPage } from "./pages/UserListPage"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/LoginPage/login" component={HomePage} />
        <Route exact path="/UserListPage/users" component={UserListPage} />
        <Route exact path="/UserPage/users/:userId" component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
//看看可不可以改改看　HomePage 49 50 的寫法　把Route 放同層
// UserPage Lightbox render props
// 刪除功能還沒寫
// 限制檔案大小
// 
