const handleRegister = (req,res,bcrypt,db) =>{
    const {email,name,password}=req.body;
    let data={};
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
                    data=user[0];
                    
                }).catch((err)=>{
                    return res.json('repeat email')
                })
        });
    })
    res.json((user[0]));

}

module.exports={
    handleRegister:handleRegister
}