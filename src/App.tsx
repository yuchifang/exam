import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import './App.css';
import "./styles/reset.scss"
import 'bootstrap/dist/css/bootstrap.min.css';

import { UserPage } from "./pages/UserPage/UserPage"
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
        <Route exact path="/UserPage/users/:userId" component={UserPage} />
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



// 40  完成所有頁面功能切版與路由
// 20  UserListPage/UserPage 可以正確顯示使用者資料
// 10  可以登入會員
// 10  可以註冊會員
// 20  可以解析 authToken(JWT)，並根據 payload 中的 sub 對應 userId
// 25  UserPage 可以編輯使用者名稱與介紹
// 10  UserPage 可以刪除使用者
// 20  Header 可以顯示目前狀態並登出
// 10  HomePage 自動轉址到 UserListPage
// 30  UserPage 可以正確上傳頭貼(關鍵字：data URI)
// 15  重整畫面後登入狀態維持不變
// 10  視覺美觀加成
// 10  支援 RWD
// 30  使用者體驗（支援 UI 元件的不同狀態）
// 10  可以將 /login, /signup 綁定到 Tab 狀態
// 20 可以在 UserListPage 搜尋使用者名稱
