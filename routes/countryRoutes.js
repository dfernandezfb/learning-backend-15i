const { Router } = require("express");
const router = Router();
const { addCountry } = require("./../controllers/countryControllers");

router.post("/", addCountry);

module.exports = router;
