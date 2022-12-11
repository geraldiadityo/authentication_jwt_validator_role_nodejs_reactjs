exports.allAccess = (req, res) => {
    res.status(200).send({
        message:"public Content"
    });
};

exports.userBoard = (req, res) => {
    res.status(200).send({
        message:"user Content"
    });
};

exports.adminBoard = (req, res) => {
    res.status(200).send({
        message:"admin Content"
    });
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send({
        message:"Moderator Content"
    });
};


