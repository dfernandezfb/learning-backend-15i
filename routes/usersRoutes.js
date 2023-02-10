const { Router } = require("express");
const { check } = require("express-validator");
const auth = require("../middlewares/auth");
const validateFields = require("../middlewares/validateFields");
const { checkIfUserExists } = require("../utils/customValidations");
const router = Router();
const {
  getUsers,
  addUser,
  login,
  deleteUser,
} = require("./../controllers/usersControllers");
// /users/transfers
router.get("/", auth, getUsers);
router.post(
  "/",
  [
    check(
      "name",
      "El formato del nombre debe ser un string de entre 2 y 30 caracteres"
    )
      .isString()
      .isLength({ min: 2, max: 30 }),
    check("lastname").not().isEmpty().isString().isLength({ min: 2, max: 30 }),
    check("email").isEmail(),
    check("age").isFloat({ min: 0, max: 150 }),
    check("gender").isIn(["M", "F", "X"]),
    check("admin").isBoolean(),
    check("country").isMongoId(),
    check("password")
      .not()
      .isEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    validateFields,
  ],
  addUser
);
router.post(
  "/login",
  [
    check("email").isEmail().isLength({ min: 5, max: 50 }),
    check("password").not().isEmpty(),
    validateFields,
  ],
  login
);
// router.put("/", getUsers);
router.delete(
  "/",
  [
    auth,
    check("id").not().isEmpty().isMongoId().custom(checkIfUserExists),
    validateFields,
  ],
  deleteUser
);
// router.get("/withdraw", getUsers);
// router.get("/transfers", getUsers);

module.exports = router;
