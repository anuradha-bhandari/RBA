

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
         res.render("register.ejs",{msg:"Registration Success"});
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

exports.addCat=(req,res)=>{
   res.render("addcategory.ejs",{msg:""});   
}

exports.savecategory=(req,res)=>{
     let{name}=req.body; 
     
    let result=modelData.saveCatData(name);
    
              if(result=="err")
              {
                res.render("addcategory.ejs",{msg:"Category Add Failed"});
                }  
              else{
                     res.render("addcategory.ejs",{msg:"Category Added successfully"});
                 }  
}


exports.viewCatProfile = (req, res) => {

    let promObj = modelData.getLoginCatProfile();
    promObj.then((profile) => {
        res.render("viewcategory.ejs", { data: profile });
    }).catch((err) => {
        console.log(err);
        res.send("Something went wrong");
    });
};

exports.deleteCat = (req, res) => {
    let id = parseInt(req.query.id.trim());
    console.log("id is ",id);
    modelData.deleteCat(id)
        .then(() => {
            // Fetch updated category list after delete
            return modelData.getAllCategories();
        })
        .then((updatedData) => {
            res.render("viewcategory.ejs", { data: updatedData });
        })
        .catch((err) => {
            console.error(err);
            res.send("Something went wrong while deleting category");
        });
};

exports.updateCat=(req,res)=>{
            res.render("updatecategory.ejs");
}
