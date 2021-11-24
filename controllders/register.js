const handleRegister = (req,res,bcrypt,db) =>{
    const {email,name,password}=req.body;
    if(!email||!name||!password){
        return res.status(400).json('incorrect form subnission')
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            password = hash;
        });
    })
    db('login')
            .returning(['id','name','email'])
            .insert({
                email:email,
                name:name,
                password:password,
            }).then((user)=>{
                try {
                    if(!user.id)
                    throw("repeat email");
                }catch (e) {
                    res.json(e);
                }
                return res.json(user[0]);
            }).catch((err)=>{
                console.log(err);
            })
}

module.exports={
    handleRegister:handleRegister
}