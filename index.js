const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const usersRoutes = require("./routes/usersRoutes");
const countryRoutes = require("./routes/countryRoutes");
const connectDB = require("./config/db");

connectDB();

const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//che, necesito que me des todos los usuarios GET /users/

app.use("/users", usersRoutes);
app.use("/countries", countryRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
