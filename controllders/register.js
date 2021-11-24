const handleRegister = (req,res,bcrypt,db) =>{
    const {email,name,password}=req.body;
    let state = false
    if(!email||!name||!password){
        return res.status(400).json('incorrect form subnission')
    }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db('login')
            .returning(['id','name','email'])
            .insert({
                email:email,
                name:name,
                password:hash,
            }).then((user)=>{
                state = true ;
                return res.json(user[0]);
            }).catch((err)=>{
                console.log(err);
            })
            console.log(state);
            if(!state){
                res.status(400).json("repeat email")
            }
        });
    })
   
}

module.exports={
    handleRegister:handleRegister
}