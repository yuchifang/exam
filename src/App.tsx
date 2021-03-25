import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import './App.css';
import "./styles/reset.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserInfoPage } from "./pages/UserInfoPage/UserInfoPage"
import { UserListPage } from "./pages/UserListPage"
import { LoginAccount } from "./pages/HomePage/LoginAccount"
import { CreateAccount } from "./pages/HomePage/CreateAccount"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={UserListPage} />
        <Route path="/LoginPage/login" component={LoginAccount} />
        <Route path="/SignUpPage/signUp" component={CreateAccount} />
        <Route exact path="/UserListPage/users" component={UserListPage} />
        <Route exact path="/UserInfoPage/users/:userId" component={UserInfoPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

// home 有東西 1
// 沒登入的情況 可以點選 userPage 的東西 
// 搜尋功能 1
// customHook 狀態確認 1


