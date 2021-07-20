const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Slider = require("../../models/Slider");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/sliderImage");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2,
    },
    fileFilter: fileFilter,
});

// to get all the the slider images list in the admin panel
router.get("/sliders", [auth, admin], async(req, res) => {
    const sliders = await Slider.find();

    res.send(sliders);
});

// to get a slider image details in the admin panel
router.get("/sliders/:id", [auth, admin], async(req, res) => {
    const slider = await Slider.findById(req.params.id);

    if (!slider) {
        return res.status(400).send("Slider Image not found");
    }

    res.send(slider);
});

// to add a new slider image in the admin panel
router.post(
    "/sliders", [auth, admin, upload.single("image")],
    async(req, res) => {
        // console.log(req.file)

        const schema = Joi.object({
            image: Joi.string(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { image } = req.body;

        let slider = new Slider({
            image: req.file.path,
        });

        try {
            slider = await slider.save();

            res.send(slider);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);

// to update the slider image details in the admin panel
router.put(
    "/sliders/:id", [auth, admin, upload.single("image")],
    async(req, res) => {
        const schema = Joi.object({
            image: Joi.string(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { image } = req.body;

        // slider = await Slider.findByIdAndUpdate(
        //     req.params.id, {
        //         image: req.file.path,
        //     }, { new: true }
        // );

        if (req.file !== undefined) {
            slider = await Slider.findByIdAndUpdate(
                req.params.id, {
                    image: req.file.path,
                }, { new: true }
            );
        } else {
            slider = await Slider.findByIdAndUpdate(req.params.id, {}, { new: true });
        }

        if (!slider) {
            return res.status(400).send("Slider image does not exist");
        }

        res.send(slider);
    }
);

// to delete a slider image in the admin panel
router.delete("/sliders/:id", [auth, admin], async(req, res) => {
    const slider = await Slider.findByIdAndRemove(req.params.id);

    if (!slider) {
        return res.status(404).send("Slider image not found ");
    }

    res.send(slider);
});

//export

module.exports = router;