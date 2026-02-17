import { config } from "dotenv";
import jwt from "jsonwebtoken";
config();

import { OPERATORS } from "./data.js";
export const ValdiatLogin = (req, res, next) => {
  const { username, password } = req.body;
  const findUserName = OPERATORS.findIndex((i) => i.username === username);
  const findPassword = OPERATORS.findIndex((i) => i.password === password);
  if (findUserName != -1 && findPassword != -1) {
    const token = jwt.sign({ name:OPERATORS[findUserName].name}, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    req.user = {
      token,
      operator: {
        id: OPERATORS[findUserName].id,
        name: OPERATORS[findUserName].name,
        role: OPERATORS[findUserName].role,
      },
    };
    next();
  } else {
    res.status(403).send("not allwoad");
  }
};

export const ValdiatToken = (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).send("Unauthorized.");
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(403).send("Token not valid.");
      }
      req.user = payload;
      next();
    });
  } catch (err) {
    console.error(err);
  }
};
