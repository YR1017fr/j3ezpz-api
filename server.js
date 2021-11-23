const express=require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');


const register =require('./controllders/register');
const signin =require('./controllders/signin');
const scheme = require('./controllders/scheme');

const db=knex({
    client:'pg',
    connection:{
        host:process.env.DATABASE_URL,
        ssl:true,
    }
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>res.json('it is working'))
app.post('/signin',(req,res)=>signin.handleSignin(req,res,bcrypt,db))
app.post('/register',(req,res)=>register.handleRegister(req,res,bcrypt,db))
app.get('/schemelist/:id',(req,res)=>{//抓方案列表
    const {id} = req.params;
    db.where({
        id:id
    }).select('schemename','no').from('scheme_base')
    .then(data=>{
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})
app.get('/scheme',(req,res)=>scheme.loadSchemeDetail(req,res,db))//載入方案
app.post('/scheme/:id',(req,res)=>scheme.saveScheme(req,res,db))//儲存方案
app.put('/scheme',(req,res)=>scheme.reviseScheme(req,res,db))//修改方案
app.delete('/scheme',(req,res)=>scheme.deleteScheme(req,res,db))//修改方案
   

app.listen(process.env.PORT || 3001,()=>{   
    console.log(`app is running on ${process.env.PORT}`);
})



