const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Brand = require("../../models/Brand");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/brandImage");
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

// to get all the the product brands list in the admin panel
router.get("/brands", [auth, admin], async(req, res) => {
    const brands = await Brand.find();

    res.send(brands);
});

// to get a product brands details in the admin panel
router.get("/brands/:id", [auth, admin], async(req, res) => {
    const brand = await Brand.findById(req.params.id);

    if (!brand) {
        return res.status(400).send("Brand not found");
    }

    res.send(brand);
});

// to create a new product brands in the admin panel
router.post(
    "/brands", [auth, admin, upload.single("image")],
    async(req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            // image:Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { name } = req.body;

        let brand = new Brand({
            name: name,
        });

        if (req.file !== undefined) {
            brand.image = req.file.path;
        }

        try {
            brand = await brand.save();
            res.send(brand);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);

// to update the product brands details in the admin panel
router.put(
    "/brands/:id", [auth, admin, upload.single("image")],
    async(req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { name } = req.body;

        let brand = await Brand.findById(req.params.id);

        if (req.file !== undefined) {
            brand.image = req.file.path;
        }

        brand.name = name;
        brand = await brand.save();

        if (!brand) {
            return res.status(400).send("Brand does not exist");
        }

        res.send(brand);
    }
);

// to delete a product brands in the admin panel
router.delete("/brands/:id", [auth, admin], async(req, res) => {
    const brand = await Brand.findByIdAndRemove(req.params.id);

    if (!brand) {
        return res.status(404).send("Brand not found ");
    }

    res.send(brand);
});

//export

module.exports = router;