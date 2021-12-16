const express = require("express");
const router = express.Router();
const axios = require('axios');
const User = require("../models/user.model");
const isAuthenticated = require("./../middleware/jwt.middleware");


router.get("/api/doglist", async (req, res, next) => {
    try {
        //     const response = await axios.get(`https://api.thedogapi.com/v1/breeds?${process.env.API_KEY}`);

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


// router.post("api/dogList/search", async (req, res, next) => {
//     try {

//         const response = await axios.get
//             (`https://api.thedogapi.com/v1/breeds/search`,
//                 {
//                     headers: {
//                         'x-api-key': process.env.API_KEY
//                     },
//                     body: {
//                         image_id: "9ccXTANkb",
//                         sub_id: userId
//                     }
//                 });
//         const data = response.data;
//         res.json(data);

//     } catch (error) {
//         next(error);
//     }
// })



// router.get("/api/favourites/my-favourites", async (req, res, next) => {
//     try {
//         const response = await axios.get
//             (`https://api.thedogapi.com/v1/favourites`,
//                 {
//                     headers: {
//                         'x-api-key': process.env.API_KEY
//                     }
//                 });
//         const data = response.data;
//         res.json(data);

//     } catch (error) {
//         next(error);
//     }
// })

// router.get("api/favourites/{favourite_id}", async (req, res, next) => {
//     try {
//         const response = await axios.get
//             (`https://api.thedogapi.com/v1/favourites/{favourite_id}`,
//                 {
//                     headers: {
//                         'x-api-key': process.env.API_KEY
//                     }
//                 });
//         const data = response.data;
//         res.json(data);

//     } catch (error) {
//         next(error);
//     }
// })

// router.delete("/favourites/{favourite_id}", async (req, res, next) => {
//     try {
//         const response = await axios.get
//             (`https://api.thedogapi.com/v1/favourites/{favourite_id}`,
//                 {
//                     headers: {
//                         'x-api-key': process.env.API_KEY
//                     }
//                 });
//         const data = response.data;
//         res.json(data);

//     } catch (error) {
//         next(error);
//     }
// })

module.exports = router;