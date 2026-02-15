import express from "express";
import { ValdiatLogin } from "./middlewares.js";
import cors from "cors";
const app = express();
app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.post("/api/login" ,ValdiatLogin,(req,res)=>{
    res.json(req.user)
})
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
