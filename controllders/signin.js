const handleSignin = (req,res,bcrypt,db) =>{
    const {email,password} = req.body;
    if(!email||!password){
        return res.status(400).json('incorrect form subnission')
    }
    db('login').where({
        email:email,
    }).select('*')
        .then(data=>{
            bcrypt.compare(password, data[0].password, function(err, response){
                if(response){//傳回email id name
                    res.json({
                        email:data[0].email,
                        id:data[0].id,
                        name:data[0].name,
                    });
                }else{
                    return res.status(400).json('wrong password');
                }
            });
        }).catch(err=>{
                res.status(400).json('wrong email');
        })
}



module.exports={
    handleSignin:handleSignin
}