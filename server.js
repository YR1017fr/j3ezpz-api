const express=require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register =require('./controllders/register');
const signin =require('./controllders/signin');
const scheme = require('./controllders/scheme');
const schemelist = require('./controllders/schemelist');

NODE_TLS_REJECT_UNAUTHORIZED = '0'
const db = knex({
    client:'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl:{
            rejectUnauthorized: false
        }
    }
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res) => res.json('it is working'))

app.post('/signin',(req,res) => signin.handleSignin(req,res,bcrypt,db))//登入

app.post('/register',(req,res) => register.handleRegister(req,res,bcrypt,db))

app.get('/schemelist/:id',(req,res) => schemelist.getSchemelist(req,res,db))//抓方案列表

app.get('/scheme',(req,res) => scheme.loadSchemeDetail(req,res,db))//載入方案

app.post('/scheme/:id',(req,res) => scheme.saveScheme(req,res,db))//儲存方案

app.put('/scheme',(req,res) => scheme.reviseScheme(req,res,db))//修改方案

app.delete('/scheme',(req,res) => scheme.deleteScheme(req,res,db))//修改方案
   

app.listen(process.env.PORT || 3001,()=>{   
    console.log(`app is running on ${process.env.PORT || 3001}`);
})



