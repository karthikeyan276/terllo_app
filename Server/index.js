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
    db.query(`select id,input from terllo where catagrary ='completed'`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:'sucess',results:result})
        }
    })
})

app.get(`/done`,(req,res)=>{
    db.query(`select id,input from terllo where catagrary ='done'`,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send({message:'sucess',results:result})
        }
    })
})


app.put(`/completedstatuschane/:id`,(req,res)=>{

    const id_10 = req.params.id
    console.log(id_10)
 
    console.log(id_10)
   
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



 app.post(`/changescatagroy/`,(req,res)=>{

    const id_10 = req.body.id
    
    console.log(id_10)
 
    console.log(id_10)
   
     db.query(`update terllo set catagrary = 'completed' where id = ${id_10} `,(err,result)=>{
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
    
    console.log(id_10)
 
    console.log(id_10)
   
     db.query(`update terllo set catagrary = 'done' where id = ${id_10} `,(err,result)=>{
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

app.listen(8001,()=>{
    console.log("server running port 9001")
})