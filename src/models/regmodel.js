let conn=require("../config/db.js");

exports.saveRegData=(uname,uemail,ucontact)=>{

       
        conn.query("insert into users values ('0',?,?,?)",[uname,uemail,ucontact],(err,result)=>{
        if(err)
        {
            return "err"
        }
        else
        {
             return "result"
        }
    
     })
}

exports.validateUserfromDB=(uemail,ucontact)=>{
    let promise=new Promise((resolve,reject)=>{
        conn.query("select * from users where uemail=? and ucontact=?",[uemail,ucontact],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else
            {
                resolve(result);
            }
        })
    });
    return promise;
}

exports.getLoginUserProfile=(loginUserId)=>{
    let promise=new Promise((resolve,reject)=>{
        conn.query("select * from users where userid=?",[loginUserId],(err,result)=>{
            if(err)
            {
                reject(err);
            }
            else{
                resolve(result);
            }
        })
    });
    return promise;
}

exports.saveCatData=(name,callback)=>{

        conn.query("insert into category values ('0',?)",[name],(err,result)=>{ 
      if(err)
        {
            return "err"
        }
        else
        {
             return "result"
        }
    
        });

   
}


exports.getLoginCatProfile=()=>{
 let promise=new Promise((resolve,reject)=>{
    conn.query("select *from category",(err,result)=>{
      if(err)
      {
        reject(err);
      }
      else
      {
        resolve(result);
      }
    })
 });
  return promise;
}

exports.deleteCat=(id)=>{

    let promise=new Promise((resolve,reject)=>{
    conn.query("delete from category where id=?",[id],(err,result)=>{
      if(err)
      {
        reject(err);
      }
      else
      {
        resolve(result);
      }
    })
 });
  return promise;
}

exports.getAllCategories = () => {
    return new Promise((resolve, reject) =>{
        conn.query("SELECT *FROM category", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.getCategoryById = (id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM category WHERE id = ?", [id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


exports.updateDatafromDB=(id,name)=>{
    let promise=new Promise((resolve,reject)=>{
        conn.query("update category set name=? where id=?",[name,id],(err,result)=>{
                if(err)
                {
                    reject(err);
                }
                else
                {
                  resolve(result);
                }
        });
    });
    return promise;
    
}

exports.getAllCategories1 = () => {
    return new Promise((resolve, reject) =>{
        conn.query("SELECT *FROM category", (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
};

exports.searchCatFromDB=(name)=>{
let promise=new Promise((resolve,reject)=>{
    conn.query("select * from category where name like ?",['%'+ name +'%'],(err,result)=>{
           if(err)
            {
                reject(err);
            } 
            else
            {
                resolve(result);
            }
    });
});
  return promise;
}

exports.addstaffdata=(sname,semail,scontact,ssalary)=>{

        conn.query("insert into staff values ('0',?,?,?,?)",[sname,semail,scontact,ssalary],(err,result)=>{
        if(err)
        {
            return "err"
        }
        else
        {
             return "result"
        }
    
     })

    }

    exports.getstaffProfile=()=>{
        let promise=new Promise((resolve,reject)=>{
            conn.query("select * from staff",[],(err,result)=>{
                if(err){
                    reject(err);
                }
                else
                {
                  resolve(result);
                }
            });
        });
            
           return promise;      
    }

exports.deleteStaff = (staff_id) => {
  return new Promise((resolve, reject) => {
    conn.query("DELETE FROM staff WHERE staff_id = ?", [staff_id], (err, result) => {
      if (err) {
        reject(err);
      }
      else 
      {resolve(result);}
    });
  });
};


exports.getStaffById = (staff_id) => {
    return new Promise((resolve, reject) => {
        conn.query("SELECT * FROM staff WHERE staff_id = ?", [staff_id], (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};


// Update staff info
exports.updateStaffById = (staff_id, name, email, contact_no, salary) => {
    return new Promise((resolve, reject) => {
        conn.query(
            "UPDATE staff SET name = ?, email = ?, contact_no = ?, salary = ? WHERE staff_id = ?",
            [name, email, contact_no, salary, staff_id],
            (err, result) => {
                conn.query("select * from staff",(err1,result1)=>{
                    if (err) reject(err);
                else resolve(result1);
                });
                
            }
        );
    });
};



exports.staffsearchfromdb=(name)=>{
    let promise=new Promise((resolve,reject)=>{

        conn.query("Select * from staff where name like ?" ,['%'+name+'%'] ,(err,result)=>{
         if(err)
         {
           reject(err);
         }
         else{
            resolve(result);
         }
        });
    }) ;

    return promise;
}