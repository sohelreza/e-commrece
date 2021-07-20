const mongoose = require("mongoose");

const PaymentTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        max: 255,
    },
}, {
    timestamps: true,
});

const PaymentType = mongoose.model("PaymentType", PaymentTypeSchema);

module.exports = PaymentType;