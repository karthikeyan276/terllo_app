const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require('cors')


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"root",
    database:"terllo"
})
app.post(`/adddtetails`,(req,res)=>{

    const input=req.body.input;
    const inprogress= req.body.inprogress
    db.query(`INSERT INTO terllo (input,catagrary)VALUES(?,?)`,[input,inprogress],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:"sucess",results:result})
        }
    })
    db.connect((err)=>{
        err? console.log(err): console.log("connected")
    })
 
})

app.get(`/dataall`,(req,res)=>{
    db.query(`select id,input,catagrary from terllo where catagrary ='inprogress'`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:'sucess',results:result})
        }
        
    })
})
app.get(`/completedstatus`,(req,res)=>{
    db.query(`select id,input,catagrary from terllo where catagrary ='completed'`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:'sucess',results:result})
        }
    })
})

app.get(`/done`,(req,res)=>{
    db.query(`select id,input,catagrary from terllo where catagrary ='Open'`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:'sucess',results:result})
        }
    })
})


app.put(`/completedstatuschane/:id`,(req,res)=>{

    const id_10 = req.params.id
    // console.log(id_10)
 
    // console.log(id_10)
   
     db.query(`update terllo set completed_status = true where id  = ${id_10} `,(err,result)=>{
         if(err){
             console.log(err)
         }else{
             res.send({message:"sucess",results:result})
         }
     })
     db.connect((err)=>{
         err? console.log(err): console.log("connected")
     })
  
 })



 app.post(`/changescatagroy`,(req,res)=>{

    const id_10 = req.body.id
    const updatecatgory=req.body.updatecatgory
    
    // console.log(id_10)
 
    // console.log("fdhfhdgfhdgf",updatecatgory)
   
     db.query(`update terllo set catagrary = "${updatecatgory}" where id = ${id_10} `,(err,result)=>{
         if(err){
             console.log(err)
         }else{
             res.send({message:"sucess",results:result})
         }
     })
     db.connect((err)=>{
         err? console.log(err): console.log("connected")
     })
  
 })
 app.post(`/changetodone`,(req,res)=>{

    const id_10 = req.body.id
    const input_1 = req.body.input
    const comleted_click = req.body.comleted_click
    
    // console.log("uuuu",comleted_click)
 
    // console.log("jjj",input_1)
   
     db.query(`update terllo set catagrary = "${comleted_click}" where id = ${id_10} `,(err,result)=>{
         if(err){
             console.log(err)
         }else{
             res.send({message:"sucess",results:result})
         }
     })
     db.connect((err)=>{
         err? console.log(err): console.log("connected")
     })
  
 })


 app.post(`/update_done`,(req,res)=>{

    const id_10 = req.body.id
    // const input_1 = req.body.input
    const comleted_click = req.body.select_open
    
    // console.log("uuuu",comleted_click)
 
    // console.log("jjj",input_1)
   
     db.query(`update terllo set catagrary = "${comleted_click}" where id = ${id_10} `,(err,result)=>{
         if(err){
             console.log(err)
         }else{
             res.send({message:"sucess",results:result})
         }
     })
     db.connect((err)=>{
         err? console.log(err): console.log("connected")
     })
  
 })
 app.delete(`/delete/:id`,(req,res)=>{

    const id_1 =req.params.id;


    const mysql = `DELETE FROM terllo  where id = ${id_1} `

    db.query(mysql,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:"sucess",results:result})
        }
    })
    db.connect((err)=>{
        err? console.log(err): console.log("connected")
    })
 
})
/////////////////////////////////////////////////////////////////////////////
app.post(`/user_login`,(req,res)=>{

    const Email=req.body.email;

    console.log(req.body)
    const Password = req.body.password;
    const First_name=req.body.First_name;
    const Last_name=req.body.Last_name
    db.query(`INSERT INTO user_regirster (First_name,Last_name,Email,Password)VALUES(?,?,?,?)`,[First_name,Last_name,Email,Password],(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:"sucess",results:result})
        }
    })
    db.connect((err)=>{
        err? console.log(err): console.log("connected")
    })
 
})
app.post(`/user`,(req,res)=>{

    const Email=req.body.Email
    const Password = req.body.Password
    db.query(`select First_name,Last_name from user_regirster ur where Email="${Email}" && password=${Password}`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:"sucess",results:result})
        }
    })
    db.connect((err)=>{
        err? console.log(err): console.log("connected")
    })
 
})

// app.post(`/user`,(req,res)=>{
//     const Email=req.body.Email
//     const Password = req.body.Password
//     mysql = `select First_name,Last_name from user_regirster ur where Email="${Email}" && password=${Password}`
//     db.query(mysql,(err,result)=>{
//         if(err){
//             console.log(err)
//         }else{
//             res.send({message:'sucess',results:result})
//         }
//     })
// })

app.listen(8001,()=>{
    console.log("server running port 8001")
})