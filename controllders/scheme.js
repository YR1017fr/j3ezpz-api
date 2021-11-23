const saveScheme =async function  (req,res,db){
  console.log('work')
  const {id} = req.params;
  const {base,haswear,suiteffect,enchanting}=req.body;
  let no = null;
  let state = true;
  await db('scheme_base')
  .returning('no')
  .insert({
    id:id,
    schemename:base.schemename,
    profession:base.profession,
    secondprofession:base.secondprofession,
    stone:base.stone
  }).then((result) => {
    no = result[0]
  }).catch((err) => {
    state = false;
    console.log(err);
  })
  await db('scheme_haswear')
  .insert({
    id:id,
    no:no,
    weapon:haswear.weapon,
    hiddenweapon:haswear.hiddenweapon,
    cap:haswear.cap,
    clothing:haswear.clothing,
    belt:haswear.belt,
    bracer:haswear.bracer,
    pants:haswear.pants,
    shoe:haswear.shoe,
    necklace:haswear.necklace,
    bellychain:haswear.bellychain,
    ringa:haswear.ringa,
    ringb:haswear.ringb,
  }).catch((err) => {
    state = false;
    console.log(err);
  })
  await db('scheme_enchanting')
  .insert({
    id:id,
    no:no,
    weapon:enchanting.weapon,
    hiddenweapon:enchanting.hiddenweapon,
    cap:enchanting.cap,
    clothing:enchanting.clothing,
    belt:enchanting.belt,
    bracer:enchanting.bracer,
    pants:enchanting.pants,
    shoe:enchanting.shoe,
    necklace:enchanting.necklace,
    bellychain:enchanting.bellychain,
    ringa:enchanting.ringa,
    ringb:enchanting.ringb,
  }).catch((err) => {
    state = false;
    console.log(err);
  })
  await db('scheme_suiteffect')
  .insert({
    id:id,
    no:no,
    JJC2:suiteffect.JJC2,
    JJC4:suiteffect.JJC4,
    戰階2:suiteffect.戰階2,
    戰階4:suiteffect.戰階4,
    飾品2:suiteffect.飾品2,
    飾品3:suiteffect.飾品3
  }).catch((err) => {
    state = false;
    console.log(err);
  })
  if(state){
    res.json('sucess');
  }else{
    res.json('fail')
  }
}

const loadSchemeDetail =async function (req,res,db){
    const {id,no} = req.query;
    let scheme={
        profession:'',
        secondprofession:'',
        haswear:{},
        suiteffect:{},
        enchanting:{},
        stone:''
    }
    let state = true;
    await db.where({
      id:id,
      no:no,
    }).select('profession','secondprofession','stone').from('scheme_base')
    .then(data=>{
      Object.assign(scheme,data[0])
    })
    .catch((err)=>{
      state=false;
      console.log(err)
    })

    await db.where({
      id:id,
      no:no,
    }).select('weapon','hiddenweapon','cap','clothing','belt','bracer','pants','shoe','necklace','bellychain','ringa','ringb').from('scheme_haswear')
    .then(data=>{
      scheme.haswear=data[0];
    })
    .catch((err)=>{
      state=false;
      console.log(err)
    })
    await db.where({
      id:id,
      no:no,
    }).select('weapon','hiddenweapon','cap','clothing','belt','bracer','pants','shoe','necklace','bellychain','ringa','ringb').from('scheme_enchanting')
    .then(data=>{
      scheme.enchanting=data[0];
    })
    .catch((err)=>{
      state=false;
      console.log(err)
    })
    await db.where({
      id:id,
      no:no,
    }).select('JJC2','JJC4','戰階2','戰階4','飾品2','飾品3').from('scheme_suiteffect')
    .then(data=>{
      scheme.suiteffect=data[0];
    })
    .catch((err)=>{
      state=false;
      console.log(err)
    })
    if(state){
      res.json(scheme)
    }else{
      res.json('fail')
    }
}

const reviseScheme =async function  (req,res,db){
  const {id,no} = req.query;
  const {base,haswear,suiteffect,enchanting}=req.body;
  let state = true;
  await db('scheme_base')
  .where({
    id:id,
    no:no
  })
  .update({
    id:id,
    schemename:base.schemename,
    profession:base.profession,
    secondprofession:base.secondprofession,
    stone:base.stone
  }).catch((err) => {
    state=false;
    console.log('base',err)
  })
  await db('scheme_haswear')
  .where({
    id:id,
    no:no
  })
  .update({
    id:id,
    no:no,
    weapon:haswear.weapon,
    hiddenweapon:haswear.hiddenweapon,
    cap:haswear.cap,
    clothing:haswear.clothing,
    belt:haswear.belt,
    bracer:haswear.bracer,
    pants:haswear.pants,
    shoe:haswear.shoe,
    necklace:haswear.necklace,
    bellychain:haswear.bellychain,
    ringa:haswear.ringa,
    ringb:haswear.ringb,
  }).catch((err) => {
    state=false;
    console.log('haswear',err)
  })
  await db('scheme_enchanting')
  .where({
    id:id,
    no:no
  })
  .update({
    id:id,
    no:no,
    weapon:enchanting.weapon,
    hiddenweapon:enchanting.hiddenweapon,
    cap:enchanting.cap,
    clothing:enchanting.clothing,
    belt:enchanting.belt,
    bracer:enchanting.bracer,
    pants:enchanting.pants,
    shoe:enchanting.shoe,
    necklace:enchanting.necklace,
    bellychain:enchanting.bellychain,
    ringa:enchanting.ringa,
    ringb:enchanting.ringb,
  }).catch((err) => {
    state=false;
    console.log('enchanting',err)
  })
  await db('scheme_suiteffect')
  .where({
    id:id,
    no:no
  })
  .update({
    id:id,
    no:no,
    JJC2:suiteffect.JJC2,
    JJC4:suiteffect.JJC4,
    戰階2:suiteffect.戰階2,
    戰階4:suiteffect.戰階4,
    飾品2:suiteffect.飾品2,
    飾品3:suiteffect.飾品3
  }).catch((err) => {
    state=false;
    console.log('suiteffect',err)
  })
  if(state){
    res.json('sucess');
  }else{
    res.json('fail');
  }
}

const deleteScheme =async function  (req,res,db){
  const {id,no} = req.query;
  let state = true;
  await db('scheme_base')
  .where({
    id:id,
    no:no
  })
  .del()
  .catch((err) => {
    state=false;
    console.log('base',err)
  })
  await db('scheme_haswear')
  .where({
    id:id,
    no:no
  })
  .del()
  .catch((err) => {
    state=false;
    console.log('haswear',err)
  })
  await db('scheme_enchanting')
  .where({
    id:id,
    no:no
  })
  .del()
  .catch((err) => {
    state=false;
    console.log('enchanting',err)
  })
  await db('scheme_suiteffect')
  .where({
    id:id,
    no:no
  })
  .del()
  .catch((err) => {
    state=false;
    console.log('suiteffect',err)
  })
  if(state){
    res.json('sucess');
  }else{
    res.json('fail');
  }
}


module.exports={
  loadSchemeDetail:loadSchemeDetail,
  saveScheme:saveScheme,
  reviseScheme:reviseScheme,
  deleteScheme:deleteScheme
}