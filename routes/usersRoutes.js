const { Router } = require("express");
const router = Router();
const { getUsers } = require("./../controllers/usersControllers");

router.get("/", getUsers);

module.exports = router;
