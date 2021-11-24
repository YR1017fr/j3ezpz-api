const handleRegister = (req,res,bcrypt,db) =>{
    const {email,name,password}=req.body;
    if(!email||!name||!password){
        return res.status(400).json('incorrect form subnission')
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db('login')
            .returning('*')
            .insert({
                email:email,
                name:name,
                password:hash,
            }).then((user)=>{
                if(user[0].email){
                    res.json(user[0]);
                }else{
                    res.status(400).json('repeat email');
                }
                
            }).catch((err)=>{
                console.log(err);
            })
        });
    })
}

module.exports={
    handleRegister:handleRegister
}