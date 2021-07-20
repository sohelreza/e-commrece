const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Category = require("../../models/Category");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/categoryImage");
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

// to get all the the product categories list in the admin panel
router.get("/categories", [auth, admin], async(req, res) => {
    const categories = await Category.find();

    res.send(categories);
});

// to get a product categories details in the admin panel
router.get("/categories/:id", [auth, admin], async(req, res) => {
    const category = await Category.findById(req.params.id);

    if (!category) {
        return res.status(400).send("Category not found");
    }

    res.send(category);
});

// to create a new product categories in the admin panel
router.post(
    "/categories", [auth, admin, upload.single("image")],
    async(req, res) => {
        // console.log(req.file)

        const schema = Joi.object({
            name: Joi.string().required(),
            // image:Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { name } = req.body;

        let category = new Category({
            name: name,
            image: req.file.path,
        });

        try {
            category = await category.save();
            res.send(category);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);

// to update the product categories details in the admin panel
router.put(
    "/categories/:id", [auth, admin, upload.single("image")],
    async(req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const { name } = req.body;

        if (req.file !== undefined) {
            category = await Category.findByIdAndUpdate(
                req.params.id, {
                    name: name,
                    image: req.file.path,
                }, { new: true }
            );
        } else {
            category = await Category.findByIdAndUpdate(
                req.params.id, {
                    name: name,
                }, { new: true }
            );
        }

        if (!category) {
            return res.status(400).send("Category does not exist");
        }

        res.send(category);
    }
);

// to delete a product categories in the admin panel
router.delete("/categories/:id", [auth, admin], async(req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);

    if (!category) {
        return res.status(404).send("Category not found ");
    }

    res.send(category);
});

//export

module.exports = router;