const User = require("../models/User");
const CustomError = require("../utils/CustomError");

const getUsers = async (req, res) => {
  try {
    const { gender, pageNumber } = req.query;
    const page = (pageNumber - 1) * 2;
    let users;
    if (!gender) {
      // users = await User.find({ age: { $gte: 18 } });
      users = await User.find().skip(page).limit(2);
    } else {
      users = await User.find({ gender });
    }
    //!! convierte a boolean
    //?? nulish
    // throw new CustomError("This is a test", 502);
    res.status(200).json(users);
  } catch (error) {
    res.status(error.code || 500).json({
      message: "I'm sorry, something is wrong with us",
      error: error.message,
    });
  }
};

module.exports = {
  getUsers,
};
