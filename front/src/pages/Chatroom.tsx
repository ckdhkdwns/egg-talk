import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Logo from "../components/Logo";

type userData = {
  authorityDtoSet: [];
  nickname: string;
  username: string;
} | null;

function Chatroom() {
  const navigate = useNavigate();
  const [user, setUser] = useState<userData>(null);
  const [tokenExist, setTokenExist] = useState(false);

  const logout = () => {
    localStorage.setItem("token", "");
    navigate("/");
  };

  useEffect(() => {
    // if token doesn't exist or is empty string, let client login
    if (!JSON.parse(localStorage.getItem("token")!)) {
      navigate("../");
      return;
    }

    // token exists
    setTokenExist(true);
    const { token }: any = JSON.parse(localStorage.getItem("token")!);

    axios
      .get("https://egg-talk-server.run.goorm.io/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response: AxiosResponse) {
        setUser(response.data);
      })
      .catch((error: any) => {
        console.log("error:", error);
      });
  }, [navigate]);

  return tokenExist ? (
    <div>
      <button onClick={logout}>Log Out</button>
      <Link to={"/"}>
        <Logo />
      </Link>
      {user ? <div>Welcome, {user.username}</div> : <Loader />}
    </div>
  ) : null;
}

export default React.memo(Chatroom);
