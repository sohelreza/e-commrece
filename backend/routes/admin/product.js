const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const admin = require("../../middleware/admin");
const Product = require("../../models/Product");
const Subcategory = require("../../models/Subcategory");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/productImage");
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

// to get all the the products list in the admin panel
router.get("/products", [auth, admin], async(req, res) => {
    const products = await Product.find()
        .populate("user", ["name"])
        .populate("category", ["name"])
        .populate("subcategory", ["name"])
        .populate("brand", ["name"]);

    res.send(products);
});

// to get a product details in the admin panel
router.get("/products/:id", [auth, admin], async(req, res) => {
    const product = await Product.findById(req.params.id)
        .populate("user", ["name"])
        .populate("category", ["name"])
        .populate("subcategory", ["name"])
        .populate("brand", ["name"]);

    if (!product) {
        return res.status(400).send("Product not found");
    }

    res.send(product);
});

// to add a new product in the admin panel
router.post(
    "/products", [auth, admin, upload.single("thumbnailImage")],
    async(req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            overview: Joi.string().required(),
            brand: Joi.objectId().empty(""),
            category: Joi.objectId().required(),
            subcategory: Joi.objectId().required(),
            unit: Joi.string().required(),
            price: Joi.number().required(),
            stock: Joi.number().min(0),
            hasOffer: Joi.boolean(),
            discountPercentage: Joi.number(),
            discountPrice: Joi.number(),
        });

        // return res.send(req.body)

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const {
            name,
            description,
            overview,
            brand,
            category,
            subcategory,
            unit,
            price,
            stock,
            hasOffer,
            discountPercentage,
            discountPrice,
        } = req.body;

        object = {};
        (object["hasOffer"] = hasOffer),
        (object["discountPercentage"] = discountPercentage);
        object["discountPrice"] = discountPrice;

        // return res.send(object)

        let product = new Product({
            user: req.user.id,
            name: name,
            description: description,
            overview: overview,
            brand: brand !== "" ? brand : undefined,
            category: category,
            subcategory: subcategory,
            unit: unit,
            price: price,
            stock: stock,
            thumbnailImage: req.file.path,
            offer: object,
        });

        try {
            product = await product.save();
            res.send(product);
        } catch (ex) {
            for (const key in ex.errors) {
                res.status(404).send(ex.errors[key].message);
            }
        }
    }
);

// to update the product details in the admin panel
router.put(
    "/products/:id", [auth, admin, upload.single("thumbnailImage")],
    async(req, res) => {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            overview: Joi.string().required(),
            brand: Joi.objectId().empty(""),
            category: Joi.objectId().required(),
            subcategory: Joi.objectId().required(),
            unit: Joi.string().required(),
            price: Joi.number().required(),
            stock: Joi.number().min(0),
            hasOffer: Joi.boolean(),
            discountPercentage: Joi.number(),
            discountPrice: Joi.number(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details);
        }

        const {
            name,
            description,
            overview,
            brand,
            category,
            subcategory,
            unit,
            price,
            stock,
            hasOffer,
            discountPercentage,
            discountPrice,
        } = req.body;

        let product = await Product.findById(req.params.id);

        if (req.file !== undefined) {
            product.thumbnailImage = req.file.path;
        }
        (product.name = name),
        (product.description = description),
        (product.overview = overview),
        (product.brand = brand !== "" ? brand : undefined),
        (product.category = category),
        (product.subcategory = subcategory),
        (product.unit = unit),
        (product.price = price),
        (product.stock = stock);
        (product.offer.hasOffer = hasOffer),
        (product.offer.discountPercentage = discountPercentage),
        (product.offer.discountPrice = discountPrice),
        (product = await product.save());

        if (!product) {
            return res.status(400).send("Product does not exist");
        }

        res.send(product);
    }
);

// to delete a product in the admin panel
router.delete("/products/:id", [auth, admin], async(req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
        return res.status(404).send("Product not found ");
    }

    res.send(brand);
});

// to get subcategories for a fixed category in the admin panel
router.get("/getSubcategories/:categoryId", async(req, res) => {
    const subcategories = await Subcategory.find({
        category: req.params.categoryId,
    });

    res.send(subcategories);
});

//export

module.exports = router;