import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import jwt, { JwtPayload } from "jsonwebtoken";
import path from "path";

const JWT_SECRET = "test123";
const PORT = "3000";
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  //do db validation fetch id of user form db
  const token = jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET
  );
  res.cookie("token", token);
  res.send("logged in!");
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
  //Get email of the user form the database

  res.send({
    userId: decoded.id,
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "");
  res.json({
    message: "Logged out ",
  });
});
app.listen(3000, () => {
  console.log("app is listening on port 3000");
});
