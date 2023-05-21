var express = require('express');
var router = express.Router();
var Plat = require("../models/plat")

router.get("/",async function  (req, res, next) {
    const plats = await Plat.find();
    res.render(
        "form",
        {
            title: "plat list",
            cont: plats
        }
    );
})

router.get("/", (req, res, next) => {
    res.render("platForm")
})


const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.post("/addPlat", upload.single('plat_image'), (req, res) => {
    const p = new Plat()
    p.plat_name = req.body.plat_name
    p.price = req.body.price
    p.nbre_ingredients = req.body.nbre_ingredients
    p.description = req.body.descriptionla
    p.plat_image = req.file.filename

    p.save()
        .then(data => console.log(data))
        .catch(e => console.log(e))
})

router.get("/:id", (req, res) => {
    Plat.findOne({_id: req.params.id})
    .then((data)=>res.send(data))
})

router.put("/:id", (req, res) => {
    Plat.findByIdAndUpdate(req.params.id, req.body)
    .then((data)=>res.send(data))
})

router.delete("/:id", (req, res) => {
    Plat.findByIdAndDelete(req.params.id)
    .then((data)=>res.send(data))
})

module.exports = router;