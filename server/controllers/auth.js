const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

function register (req, res) {
    const { name, surname, alias, age, email, phone, password, role } = req.body;

    if( !name || !surname || !alias || !age || !email || !phone || !password || !role) res.status(400).send({msg: "Los campos son obligatorios"});

    const user = new User ({
        name, 
        surname, 
        alias, 
        age, 
        email: email.toLowerCase(), 
        phone, 
        password, 
        role: "Admin"
    });

    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password,salt);

    console.log(password);
    console.log(hash);
    user.password = hash;
    
    user.save((error,userStorage)=>{
        if(error){
            res.status(400).send({msg: "Error al crear el usuario"});
            console.log(error);
        } else {
            res.status(200).send(userStorage);
        }
    })

    //res.status(200).send({msg : "Succcess"})
}

function login (req,res) {
    const { email, password} = req.body;

    if(!email) res.status(400).send({msg: "email obligatorio"})
    if(!password) res.status(400).send({msg: "password obligatoria"})

    const emailLowerCase = email.toLowerCase();

    User.findOne({email: emailLowerCase}, (error, userStorage) => {
        if (error) {
            res.status(500).send({msg: "error del servidor"});
        } else {
            bcrypt.compare(password, userStorage.password, (bcryptError, check) => {
                if (bcryptError) {
                    res.status(500).send({msg: "Error de servidor"});
                } else if (!check) {
                    res.status(400).send({msg: "Error de servidor"});
                } /*else if (!userStorage.active) {
                    res.status(401).send({msg: "Conflicto de Usario"});
                }*/ else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStorage),
                        refresh: jwt.createRefreshToken(userStorage)
                    });
                }
            })
            //console.log("Password:", password);
            //console.log(userStorage);
        }
    });
}

function refreshAccessToken (req, res){
    const {token} = req.body;
    const {user_id} = jwt.decoded(token);

    User.findOne({_id : user_id}, (error, userStorage) => {
        if (error) {
            res.status(500).send({msg: "Server error"});
        } else {
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage),
            });
        }
    })
}

module.exports = {
    register,
    login,
    refreshAccessToken
}