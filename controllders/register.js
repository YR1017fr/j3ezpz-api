const handleRegister = async function(req,res,bcrypt,db) {
    const {email,name,password}=req.body;
    
    // let state = true ;
    if(!email||!name||!password){
        return res.status(400).json('incorrect form subnission')
    }
    let pass = bcrypt.genSalt(10, function(err, salt) {
        let pass = bcrypt.hash(password, salt, function(err, hash) {
            return hash;
        });
        return pass ;
    })
    console.log(pass,"密碼");
    db('login')
    .returning(['id','name','email'])
    .insert({
        email:email,
        name:name,
        password:pass,
    }).then((user)=>{
        console.log('work')
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