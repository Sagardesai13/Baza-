const Users = require('../models/userModel');

const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by id
        console.log("req.user... : ",req.user);
        const user = await Users.findOne({
            _id: req.user.id
        })
        console.log("user",user);
        if(user.role === 0)
        {
            return res.status(400).json({msg: "Admin resources access denied"});
        }
        next();
        
    } 
    catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = authAdmin