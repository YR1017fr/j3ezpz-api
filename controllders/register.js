const handleRegister = async function(req,res,bcrypt,db) {
    const {email,name,password}=req.body;
    let state = true ;
    if(!email||!name||!password){
        return res.status(400).json('incorrect form subnission')
    }
    await bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
             db('login')
            .returning(['id','name','email'])
            .insert({
                email:email,
                name:name,
                password:hash,
            }).then((user)=>{
                return res.json(user[0]);
            }).catch((err)=>{
                state = false ;
                console.log(err);
            })
        });
    })
    console.log(state);
    if(!state){
        res.status(400).json("repeat email")
    }
}

module.exports={
    handleRegister:handleRegister
}