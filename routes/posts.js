const express = require('express');

const router = express.Router();

router.get('/', require('./verifyToekn'), (req, res) => {
    res.json({
        posts: {
            title: "hanan ahmad",
            description: "random date for any nayyab i miss you"
        }
    });
});

module.exports = router;