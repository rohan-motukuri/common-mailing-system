const express = require("express");
const router = express.Router();

router.get("/UserCheck", (req, res) => {
    res.send("poty :" + process.env.PORT);
});

module.exports = router;