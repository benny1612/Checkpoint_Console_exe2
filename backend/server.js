import express from "express";
import { ValdiatLogin, ValdiatToken } from "./middlewares.js";
import cors from "cors";
import { INITIAL_MESSAGES } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/api/login", ValdiatLogin, (req, res) => {
  res.json(req.user);
});
app.get("/api/messages", ValdiatToken, (req, res) => {
  const name=req.user.name;
  const foundItem = INITIAL_MESSAGES.find(item => item.from.name === name);
  if(foundItem){
    
  res.json({name: foundItem});

  }else{res.json({err:"no messages"})}


});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
