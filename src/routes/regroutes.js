const express = require("express");
const ctrl = require("../controller/regctrl.js");
const router = express.Router();

router.get("/", ctrl.homePage);

router.get("/register", ctrl.register);
router.post("/submit", ctrl.submitData);

router.get("/login", ctrl.signin);
router.post("/validate", ctrl.validateUser);

router.get("/viewdash",ctrl.viewDashboard);

router.get("/addcategory",ctrl.addCat);
router.post("/savecatgory",ctrl.savecategory);

router.get("/viewcategory",ctrl.viewCatProfile);

router.get("/deleteCat",ctrl.deleteCat);
router.get("/updatecategory",ctrl.updateCat);
router.post("/finalupdate",ctrl.update);

router.get("/searchcatbyname",ctrl.searchCat);



router.get("/addstaff",ctrl.staffadd);
router.post("/staffadded",ctrl.StaffdataAdd)

router.get("/viewstaff",ctrl.viewstaffdata);

router.get("/deletestaff", ctrl.delstaff);


router.get("/updatestaff", ctrl.upstaff);          // Render update form
router.post("/updatestaffData", ctrl.updateStaff);  // Process update form

router.get("/staffsearch",ctrl.staffsearchdata);

module.exports = router;   

//this is the routes file