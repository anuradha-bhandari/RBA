

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
                    console.log("login id store in session "+req.session.uid);
                    res.render("layout.ejs");
            }
            else
            {
                res.render("login.ejs",{msg:"Invalid data"});
            }
           
        }).catch((err)=>{
            console.log("Something went wrong");
        });

}

exports.viewDashboard=(req,res)=>{
        res.render("layout.ejs");
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

exports.updateCat = (req, res) => {
    let id = req.query.id;
    modelData.getCategoryById(id)
    .then((data) => {
        console.log("Updated data "+data[0]);
        res.render("updatecategory.ejs", {data: data[0]});
    })
    .catch((err) => {
        console.error(err);
        res.send("Failed to load category for editing");
    });
};



exports.update=(req,res)=>{
       let {id,name}=req.body;
       modelData.updateDatafromDB(id,name)
       .then(() => {
           // Fetch updated category list after delete
           return modelData.getAllCategories1();
       })
       .then((updatedData) => {
           res.render("viewcategory.ejs", {data: updatedData});

       })
       .catch((err) => {
           console.error(err);
        res.render("updatecategory.ejs",{data:"something went wrong or duplicate category entry"});
       });
}

exports.searchCat = (req, res) => {
  let name = req.query.sd;
  modelData.searchCatFromDB(name)
    .then((result) => {
      res.send(result); 
    })
    .catch((err) => {
      console.log(err);
      
    });
};

exports.staffadd=(req,res)=>{
    res.render("addstaff.ejs",{msg:""});   
}

exports.StaffdataAdd=(req,res)=>{
     let{sname,semail,scontact,ssalary}=req.body;
     let result=modelData.addstaffdata(sname,semail,scontact,ssalary);

     if(result=="err")
     {
        res.render("addstaff.ejs",{msg:"Staff Add Failed"});
     }
     else
     {
         res.render("addstaff.ejs",{msg:"Staff Add Successfully"});
     }
}

exports.viewstaffdata=(req,res)=>{
    let promObj=modelData.getstaffProfile();
    promObj.then((profile)=>{
        res.render("viewstaff.ejs", { data: profile});

    }).catch((err)=>{
            res.send("something went wrong");
    });
    
}

exports.delstaff = (req, res) => {
  let staff_id = parseInt(req.query.staff_id.trim());

  modelData.deleteStaff(staff_id)
    .then(() => modelData.getstaffProfile())
    .then((updatedData) => {
      res.render("viewstaff.ejs", { data: updatedData });
    })
    .catch((err) => {
      console.error(err);
      res.send("Something went wrong while deleting staff record");
    });
};

exports.upstaff  = (req, res) => {
    let staff_id = req.query.staff_id;
    modelData.getStaffById(staff_id).then((data) => {
        res.render("updatestaff.ejs", { data: data[0] });
    }).catch(err => {
        res.send("Error retrieving staff: " + err);
    });
};


// POST: handle update form submission
exports.updateStaff = (req, res) => {
    const { staff_id, name, email, contact_no, salary } = req.body;

    modelData.updateStaffById(staff_id, name, email, contact_no, salary)
        .then((data) => {
            res.render("viewstaff.ejs",{data:data});
        })
        .catch(err => {
            res.status(500).send("Error updating staff: " + err);
        });
};

exports.staffsearchdata=(req,res)=>{
   let name=req.query.sd;
       modelData.staffsearchfromdb(name).then((result)=>{
         res.send(result);
       }).catch((err)=>{
        console.log(err);
       });
      

   
}