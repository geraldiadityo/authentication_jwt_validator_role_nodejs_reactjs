const {verifySignup} = require("../middleware");
const controller = require("../controller/auth.controller.js");

module.exports = function(app){
    app.use(function(req, res, next){
        res.header(
            "Access-Control-Allow-Header",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post("/api/auth/signup",
    [verifySignup.checkDuplicateUsernameOrEmail,
    verifySignup.checkRolesExisted],
    controller.signup);

    app.post("/api/auth/signin",controller.signin);
};
