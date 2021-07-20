const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 255,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
});

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;