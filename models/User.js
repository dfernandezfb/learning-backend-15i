const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      default: "Usuario sin nombre",
      uppercase: true,
      trim: true,
      minLength: [2, "Debe tener al menos dos caracteres"],
      maxLength: [30, "Debe tener como máximo treinta caracteres"],
    },
    email: {
      type: String,
    },
    age: {
      type: Number,
    },
    lastname: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["F", "M", "X"],
    },
    admin: {
      type: Boolean,
    },
    hobbies: Array,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("User", UserSchema);
