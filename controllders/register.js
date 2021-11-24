const handleRegister = async function(req,res,bcrypt,db) {
    const {email,name,password}=req.body;
    let pass = '';
    // let state = true ;
    if(!email||!name||!password){
        return res.status(400).json('incorrect form subnission')
    }
    await bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            pass=hash;
        });
    })
    console.log(pass);
    db('login')
    .returning(['id','name','email'])
    .insert({
        email:email,
        name:name,
        password:pass,
    }).then((user)=>{
        return res.json(user[0]);
    }).catch((err)=>{
        console.log(err);
        res.status(400).json("repeat email")
    })
    // console.log(state);
    // if(!state){
    //     res.status(400).json("repeat email")
    // }
}

module.exports={
    handleRegister:handleRegister
}