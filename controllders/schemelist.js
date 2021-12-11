const getSchmemlist = (req, res, db) =>{
    const {id} = req.params;
    db.where({id}).select('schemename','no').from('scheme_base')
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = {
    getSchmemlist : getSchmemlist
}