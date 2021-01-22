import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom"
import './App.css';
import { HomePage } from "./pages/HomePage/HomePage"
import { UserPage } from "./pages/UserPage/UserPage"
import "./styles/reset.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserListPage } from "./pages/UserListPage"
import { LoginAccount } from "./pages/HomePage/LoginAccount"
import { CreateAccount } from "./pages/HomePage/CreateAccount"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/" component={HomePage} /> */}
        <Route path="/LoginPage/login" component={LoginAccount} />
        <Route path="/SignupPage/signup" component={CreateAccount} />
        <Route exact path="/UserListPage/users" component={UserListPage} />
        <Route exact path="/UserPage/users/:userId" component={UserPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
//看看可不可以改改看　HomePage 49 50 的寫法　把Route 放同層
// UserPage Lightbox render props?
// 刪除功能還沒寫 (如果創新帳號就可以刪了
// 上傳 有問題 
// 加入帳號要跳到　編輯頁
// home 要跳到　登入登出有問題
// userPage Cuseyom hook 還沒寫
// header 的連接

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
