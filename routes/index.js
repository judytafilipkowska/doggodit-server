const router = require("express").Router();

const fileUploader = require("../config/cloudinary");

router.get("/", (req, res) => {
  res.json("ALL GOOD!!")
})

// POST /api/upload
router.post("/api/upload", fileUploader.single("image"), (req, res, next) => {

  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ secure_url: req.file.path });
});

module.exports = router;
