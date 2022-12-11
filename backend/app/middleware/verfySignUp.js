const db = require("../model");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then((user) => {
        if (user){
            res.status(400).send({
                message:"Failed! username has already use!"
            });
            return;
        }
        User.findOne({
            where:{
                email:req.body.email
            }
        }).then((email) => {
            if (email){
                res.status(400).send({
                    message:"Failed! email has already use!"
                });
                return;
            }
            next();
        });
    });
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles){
        for (let i = 0; i < req.body.roles; i++){
            if (!ROLES.includes(req.body.roles[i])){
                res.status(400).send({
                    message:"Failed! role does not exist = "+req.body.roles[i]
                });
                return;
            }
        }
    }
    next();
};

const verifySignup = {
    checkDuplicateUsernameOrEmail:checkDuplicateUsernameOrEmail,
    checkRolesExisted:checkRolesExisted,
};

module.exports = verifySignup;
