const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

const UserRoutes = require("./routes/UserRoutes");
const RecipeRoutes = require("./routes/RecipeRoutes");

app.use("/users", UserRoutes);
app.use("/recipes", RecipeRoutes);

app.listen(5000);
