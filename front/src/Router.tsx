import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatroom from "./pages/Chatroom";
import Join from "./pages/Join";
import Login from "./pages/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/join" element={<Join />} />
        <Route path="/chatroom" element={<Chatroom />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
