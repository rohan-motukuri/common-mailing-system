const express = require("express");
const router = express.Router();

const { VerifySubscriber } = require('../controllers/Subscribers_Controller')

router.get("/Verify:mail", VerifySubscriber);

router.get("/Request:mail", (req, res) => {
    return res.send(req.params.mail).status(200);
});

module.exports = router; 