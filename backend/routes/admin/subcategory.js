const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Subcategory = require("../../models/Subcategory");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/subcategoryImage");
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

// to get all the the product subcategories list in the admin panel
router.get("/subcategories", [auth, admin], async(req, res) => {
    const categories = await Subcategory.find().populate("category");

    res.send(categories);
});

// to get a product subcategories details in the admin panel
router.get("/subcategories/:id", [auth, admin], async(req, res) => {
    const subcategory = await Subcategory.findById(req.params.id).populate(
        "category"
    );

    if (!subcategory) {
        return res.status(400).send("Subcategory not found");
    }

    res.send(subcategory);
});

// to create a new product subcategories in the admin panel
router.post(
    "/subcategories", [auth, admin, upload.single("image")],
    async(req, res) => {
        // console.log(req.file)

        const schema = Joi.object({
            name: Joi.string().required(),
            category: Joi.objectId().required(),
            // image:Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { name, category } = req.body;

        let subcategory = new Subcategory({
            name: name,
            category: category,
            image: req.file.path,
        });

        try {
            subcategory = await subcategory.save();
            res.send(subcategory);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);

// to update the product subcategories details in the admin panel
router.put(
    "/subcategories/:id", [auth, admin, upload.single("image")],
    async(req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            category: Joi.objectId().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { name, category } = req.body;

        if (req.file !== undefined) {
            subcategory = await Subcategory.findByIdAndUpdate(
                req.params.id, {
                    name: name,
                    category: category,
                    image: req.file.path,
                }, { new: true }
            );
        } else {
            subcategory = await Subcategory.findByIdAndUpdate(
                req.params.id, {
                    name: name,
                    category: category,
                }, { new: true }
            );
        }

        if (!subcategory) {
            return res.status(400).send("Subcategory does not exist");
        }

        res.send(subcategory);
    }
);

// to delete a product subcategories in the admin panel
router.delete("/subcategories/:id", [auth, admin], async(req, res) => {
    const subcategory = await Subcategory.findByIdAndRemove(req.params.id);

    if (!subcategory) {
        return res.status(404).send("Subcategory not found ");
    }

    res.send(subcategory);
});

//export

module.exports = router;