const jwt = require("../utils/jwt");

function asureAuth(req,res,next){

    if(!req.headers.authorization){
        res
        .status(403)
        .send({msg: "no auth"})
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    try {
        const payload = jwt.decoded(token);
        const {exp} = payload;
        const currentDate = new Date().getTime();

        if(exp <= currentDate) res.status(400).send({msg: "Token expired"})
        else req.user = payload;
        next();
    } catch (error) {
        res.status(400).send({msg: "invalid Token"})
    }
}

module.exports = {
    asureAuth,
};