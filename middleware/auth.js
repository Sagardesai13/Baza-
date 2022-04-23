const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{

    try {
        
        const token = req.body.token;
        console.log("@ auth middleware :",token);
        if(!token) 
        {
            return res.status(400).json({msg: "Invalid Authentication"});
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{

            if(err) 
            {
                return res.status(400).json({msg: "Invalid Authentication"});
            }

            req.user = user;
            console.log("user from db :",user);
            console.log("req to next fn :",req.user);
            next();
        })
    } catch (err) {

        return res.status(500).json({msg: err.message});
    }
}

module.exports = auth