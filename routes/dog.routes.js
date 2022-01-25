const express = require("express");
const router = express.Router();
const axios = require('axios');


router.get("/api/doglist", async (req, res, next) => {
    try {
        const response = await axios.get
            (`https://api.thedogapi.com/v1/breeds`,
                {
                    headers:
                        { 'x-api-key': process.env.API_KEY }
                });
        const data = response.data
        res.json(data)

    } catch (error) {
        next(error);
    }
})

module.exports = router;