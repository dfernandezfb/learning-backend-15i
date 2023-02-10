const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const { gender, pageNumber } = req.query;
    const page = (pageNumber - 1) * 2;
    let users;
    let count;
    if (!gender) {
      // users = await User.find({ age: { $gte: 18 } });
      [users, count] = await Promise.all([
        User.find().skip(page).limit(2).populate("country"),
        User.countDocuments(),
      ]);
      // users = await User.find().skip(page).limit(2);
      // count = await User.countDocuments();
    } else {
      users = await User.find({ gender });
    }

    // skip(4) limit(5)
    // 5,6,7,8,9,10
    //!! convierte a boolean
    //?? nulish
    // throw new CustomError("This is a test", 502);
    res.status(200).json({ users, count });
  } catch (error) {
    res.status(error.code || 500).json({
      message: "I'm sorry, something is wrong with us",
      error: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, lastname, email, age, gender, country, admin, password } =
      req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordEncrypted = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      lastname,
      email,
      age,
      gender,
      country,
      admin,
      password: passwordEncrypted,
    });

    const userSaved = await newUser.save();
    res
      .status(200)
      .json({ message: "El pais se agregó con éxito", user: userSaved });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :(" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError("Usuario y contraseña son requeridas", 400);
    const user = await User.findOne({ email });
    if (!user) throw new CustomError("Usuario no encontrado", 404);
    const passOk = await bcrypt.compare(password, user.password);
    if (!passOk) throw new CustomError("Contraseña incorrecta", 400);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ message: "Ingreso correcto", ok: true, user, token });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const userRemoved = await User.findByIdAndDelete(id);
    if (!userRemoved) throw new CustomError("Usuario no encontrado", 404);
    res.status(200).json({ message: "El usuario ha sido eliminado" });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :|" });
  }
};

module.exports = {
  getUsers,
  addUser,
  login,
  deleteUser,
};
