const express = require("express");
const ctrl = require("../controller/regctrl.js");
const router = express.Router();

router.get("/", ctrl.homePage);

router.get("/register", ctrl.register);
router.post("/submit", ctrl.submitData);

router.get("/login", ctrl.signin);
router.post("/validate", ctrl.validateUser);

router.get("/addcategory",ctrl.addCat);
router.post("/savecatgory",ctrl.savecategory);

router.get("/viewcategory",ctrl.viewCatProfile);

router.get("/deleteCat",ctrl.deleteCat);
router.get("/updatecat",ctrl.updateCat);

module.exports = router;   

