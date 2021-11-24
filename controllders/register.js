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
                    console.log(user.ok)
                    data=user[0];
                }).catch((err)=>{
                    console.log(err);
                })
        });
    })
    console.log(data)
    if(data.email){
        res.json(data);
    }else{
        res.status(400).json('repeat email');
    }


}

module.exports={
    handleRegister:handleRegister
}