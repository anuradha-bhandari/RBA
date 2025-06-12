let routes=require("express");
let ctrl=require("../controller/regctrl.js");

let router=routes.Router();

router.get("/",ctrl.homePage);

router.get("/register",ctrl.register);
router.post("/submit",ctrl.submitData);

router.get("/login",ctrl.signin);
router.post("/validate",ctrl.validateUser);

module.exports=router;