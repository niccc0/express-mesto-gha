import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

import usersRouter from "./routes/users.js";
import cardsRouter from "./routes/cards.js";

const PORT = process.env.PORT || 3000;
const url = "mongodb+srv://nick:fVC4jTdF0g3DKMqY@13.xe57swi.mongodb.net/13";
// const url = "mongodb://localhost:27017/mestodb";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(url)
  .then(() => console.log("db ok"))
  .catch((err) => console.log("db error", err));

app.use((req, res, next) => {
  req.user = { _id: "64aaa960472ebba347ce38c5" };
  next();
});
const checkAuth = (req, res, next) => {
  req.user._id;
  next();
};
app.use("/cards", checkAuth, cardsRouter);
app.use("/users", checkAuth, usersRouter);

app.listen(PORT, () => console.log("Ссылка на сервер"));
