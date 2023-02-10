const Country = require("../models/Country");

const addCountry = async (req, res) => {
  try {
    const { name, timezone } = req.body;
    const newCountry = new Country({ name, timezone });
    const countrySaved = await newCountry.save();
    res
      .status(200)
      .json({ message: "El pais se agregó con éxito", country: countrySaved });
  } catch (error) {
    res
      .status(error.code || 500)
      .json({ message: error.message || "algo explotó :(" });
  }
};

module.exports = { addCountry };
