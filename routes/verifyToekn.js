const jwt = require('jsonwebtoken');

const verify = (req, res, next) => {
    const token = req.header('auth-token'); //req is ued for getting tokrn

    if (!token) {
        return res.status(401).send('Access Deined');
    } else {
        try {
            //check toekn
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
            console.log(req.user.name, verified);

            next();
        } catch (error) {
            res.status(400).send('Invalid Token');
        }
    }
}

module.exports = verify;