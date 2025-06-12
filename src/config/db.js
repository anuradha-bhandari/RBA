let mysql=require("mysql2");
let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"radha472002",
    database:"restaurant_billing_application"

});

conn.connect((err)=>{
    if(err){
        console.log("Databases connection has failed");
    }
    else{
        console.log("Database has connected");
    }
});

module.exports=conn;