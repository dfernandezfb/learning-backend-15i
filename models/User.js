const { Schema, model, SchemaType } = require("mongoose");

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
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Teams",
    },
    password: {
      type: String,
      trim: true,
      required: [true, "La contraseña es obligatoria"],
    },
    hobbies: Array,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
UserSchema.methods.toJSON = function () {
  const { password, ...user } = this.toObject();
  return user;
};

module.exports = model("User", UserSchema);
