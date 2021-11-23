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
        host:'127.0.0.1',
        user:'postgres',
        password:'alex134679852',
        database:'j3pz'
    }
});
let database=[
    {
        id:'001',
        email:'a27536625',
        name:'Raymond',
        password:'$2a$10$mA0v6ufxOkLCJ6Ddg/I02eJDVCoZdbcb4NgNgjBGottIEfbSBb/qu',
        scheme:[
            {
                No:'1',
                schemename:'北傲訣',
                profession:'霸刀',
                secondprofession:'北傲訣',
                haswear:{
                    weapon:1,
                    hiddenweapon:1,
                    cap:1,
                    clothing:1,
                    belt:1,
                    bracer:1,
                    pants:1,
                    shoe:2,
                    necklace:4,
                    bellychain:4,
                    ringa:3,
                    ringb:4,
                },
                suiteffect:{
                    JJC2:true,
                    JJC4:true,
                    戰階2:false,
                    戰階4:false,
                    飾品2:true,
                    飾品3:true,
                },
                enchanting:{
                    weapon:'外攻',
                    hiddenweapon:'破防',
                    cap:'外攻',
                    clothing:'化勁',
                    belt:'化勁',
                    bracer:'破防',
                    pants:'破防',
                    shoe:'加速',
                    necklace:'禦勁',
                    bellychain:'化勁',
                    ringa:'力道',
                    ringb:'力道',
                },
                stone:'見切斬鐵痛擊'
            },
            {
                No:'2',
                schemename:'天小策',
                profession:'天策',
                secondprofession:'傲血戰意',
                haswear:{
                    weapon:false,
                    hiddenweapon:1,
                    cap:1,
                    clothing:1,
                    belt:1,
                    bracer:1,
                    pants:1,
                    shoe:2,
                    necklace:2,
                    bellychain:2,
                    ringa:1,
                    ringb:2,
                },
                suiteffect:{
                    JJC2:true,
                    JJC4:true,
                    戰階2:false,
                    戰階4:false,
                    飾品2:true,
                    飾品3:true,
                },
                enchanting:{
                    weapon:'外攻',
                    hiddenweapon:'破防',
                    cap:'外攻',
                    clothing:'化勁',
                    belt:'化勁',
                    bracer:'破防',
                    pants:'破防',
                    shoe:'加速',
                    necklace:'禦勁',
                    bellychain:'化勁',
                    ringa:'力道',
                    ringb:'力道',
                },
                stone:'見切斬鐵痛擊'
            }
        ],
    },
    {
        id:'002',
        eamil:'bnn',
        name:'Banana',
        password:'b123',
        scheme:[
            {
                No:'1',
                schemename:'北傲訣',
                profession:'霸刀',
                secondprofession:'北傲訣',
                haswear:{
                    weapon:1,
                    hiddenweapon:1,
                    cap:1,
                    clothing:1,
                    belt:1,
                    bracer:1,
                    pants:1,
                    shoe:2,
                    necklace:4,
                    bellychain:4,
                    ringa:3,
                    ringb:4,
                },
                suiteffect:{
                    JJC2:true,
                    JJC4:true,
                    戰階2:false,
                    戰階4:false,
                    飾品2:true,
                    飾品3:true,
                },
                enchanting:{
                    weapon:'外攻',
                    hiddenweapon:'破防',
                    cap:'外攻',
                    clothing:'化勁',
                    belt:'化勁',
                    bracer:'破防',
                    pants:'破防',
                    shoe:'加速',
                    necklace:'禦勁',
                    bellychain:'化勁',
                    ringa:'力道',
                    ringb:'力道',
                },
                stone:'見切斬鐵痛擊'
            },
            {
                No:'2',
                schemename:'丐小幫',
                profession:'丐幫',
                secondprofession:'笑塵訣',
                haswear:{
                    weapon:1,
                    hiddenweapon:1,
                    cap:1,
                    clothing:1,
                    belt:1,
                    bracer:1,
                    pants:1,
                    shoe:2,
                    necklace:2,
                    bellychain:2,
                    ringa:1,
                    ringb:2,
                },
                suiteffect:{
                    JJC2:true,
                    JJC4:true,
                    戰階2:false,
                    戰階4:false,
                    飾品2:true,
                    飾品3:true,
                },
                enchanting:{
                    weapon:'外攻',
                    hiddenweapon:'破防',
                    cap:'外攻',
                    clothing:'化勁',
                    belt:'化勁',
                    bracer:'破防',
                    pants:'破防',
                    shoe:'加速',
                    necklace:'禦勁',
                    bellychain:'化勁',
                    ringa:'力道',
                    ringb:'力道',
                },
                stone:'見切斬鐵痛擊'
            }
        ],
    },
]
const nowscheme={
        No:'3',
        schemename:'驚小羽',
        profession:'唐門',
        secondprofession:'驚羽訣',
        haswear:{
            weapon:1,
            hiddenweapon:1,
            cap:1,
            clothing:1,
            belt:1,
            bracer:1,
            pants:1,
            shoe:2,
            necklace:4,
            bellychain:4,
            ringa:3,
            ringb:4,
        },
        suiteffect:{
            JJC2:true,
            JJC4:true,
            戰階2:false,
            戰階4:false,
            飾品2:true,
            飾品3:true,
        },
        enchanting:{
            weapon:'外攻',
            hiddenweapon:'破防',
            cap:'外攻',
            clothing:'化勁',
            belt:'化勁',
            bracer:'破防',
            pants:'破防',
            shoe:'加速',
            necklace:'禦勁',
            bellychain:'化勁',
            ringa:'力道',
            ringb:'力道',
        },
        stone:'見切斬鐵痛擊'
}

const savescheme={
    No:'1',
    schemename:'武林之巔',
    profession:'霸刀',
    secondprofession:'北傲訣',
    haswear:{
        weapon:1,
        hiddenweapon:1,
        cap:1,
        clothing:1,
        belt:1,
        bracer:1,
        pants:1,
        shoe:2,
        necklace:4,
        bellychain:4,
        ringa:3,
        ringb:4,
    },
    suiteffect:{
        JJC2:true,
        JJC4:true,
        戰階2:false,
        戰階4:false,
        飾品2:true,
        飾品3:true,
    },
    enchanting:{
        weapon:'外攻',
        hiddenweapon:'破防',
        cap:'外攻',
        clothing:'化勁',
        belt:'化勁',
        bracer:'破防',
        pants:'破防',
        shoe:'加速',
        necklace:'禦勁',
        bellychain:'化勁',
        ringa:'力道',
        ringb:'力道',
    },
    stone:'見切斬鐵痛擊'
}

const app = express();
app.use(cors());
app.use(express.json());

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



