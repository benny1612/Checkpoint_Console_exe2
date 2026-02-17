import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import UserContext from "../contexts/UserContext.js";

export default function App() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [messages,setMessages]=useState("")

  const fatchData = async () => {
    if (userName && password) {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        { username: userName, password: password },
      );
      console.log(response);

      localStorage.setItem("token", response.data.token);
      setUser(response.data.operator);
    }
  };
  const fatchMessages= async ()=>{
    const response =await axios.get(
      "http://localhost:3000/api/messages",{
        headers:{
          "token":localStorage.getItem("token")
        }
      }
    )
    const jsonString = JSON.stringify(response.data);

    setMessages(jsonString)
  }

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div>
        <p>user name</p>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          type="text"
          placeholder="user name"
        />
        <p>password</p>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          placeholder="password"
        />
        {!user && <button onClick={fatchData}>Login</button>}
        {user && <h1>Welcome {user.name} to my website!</h1>}
        {user && <button onClick={fatchData}>Logout</button>}
        <br />
        <button onClick={fatchMessages} >get my messages</button>
        <div>{messages}</div>
      </div>
    </UserContext.Provider>
  );
}
