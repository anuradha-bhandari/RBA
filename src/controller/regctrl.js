

let modelData=require("../models/regmodel.js");

exports.homePage=(req,res)=>{
    res.render("home.ejs");
} 
exports.register=(req,res)=>{
    res.render("register.ejs",{msg:""});
}
exports.submitData=(req,res)=>{
    
    let {uname,uemail,ucontact}=req.body;
    let result=modelData.saveRegData(uname,uemail,ucontact);
    if(result=="err")
    {
        res.render("register.ejs",{msg:"Failed"});
    }  
    else{
         res.render("register.ejs",{msg:"success"});
    }
        
       
    
}

exports.signin=(req,res)=>{
        res.render("login.ejs",{msg:""});
}


exports.validateUser=(req,res)=>{
        let{uemail,ucontact}=req.body;

        console.log(uemail,ucontact);
        let result=modelData.validateUserfromDB(uemail,ucontact);
        result.then((r)=>{
            if(r.length!=0){
                    req.session.uid=r[0].userid;
                    console.log("login id store in session "+r[0].userid);
                    res.render("dashboard.ejs");
            }
            else
            {
                res.render("login.ejs",{msg:"Invalid data"});
            }
           
        }).catch((err)=>{
            console.log("Something went wrong");
        });

}