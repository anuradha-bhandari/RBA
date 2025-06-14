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

/*exports.updateDatafromDB=()=>{
    
}*/