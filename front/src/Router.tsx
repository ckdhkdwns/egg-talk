import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Join from "./pages/Join";
import Login from "./pages/Login";
import UserInfo from "./pages/UserInfo";
import Main from "./pages/Main";
import DarkmodeBtn from "./components/DarkmodeBtn";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Join />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/" element={<Main />} />
      </Routes>
      <DarkmodeBtn />
    </BrowserRouter>
  );
}

export default Router;
