const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const usersRoutes = require("./routes/usersRoutes");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT;

//che, necesito que me des todos los usuarios GET /users/

app.use("/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
