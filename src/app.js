let express=require("express");
let mysql2=require("mysql2");
let app=express();
app.set("view engine","ejs");
app.use(express.static("public"));
let session= require("express-session");
let bodyparser=require("body-parser");
let db=require("./config/db.js");
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(session({
    secret:'11111111f',
    resave:true,
    saveUninitialized:false
})); 
let routes=require("./routes/regroutes.js");
app.use("/",routes);
 

module.exports=app;
