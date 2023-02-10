const { Schema, model } = require("mongoose");

const CountrySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "El nombre es obligatorio"],
      minLength: 2,
      maxLength: 50,
    },
    timezone: String,
  },
  {
    timeseries: {
      createdAt: true,
    },
    versionKey: false,
  }
);

module.exports = model("Country", CountrySchema);
