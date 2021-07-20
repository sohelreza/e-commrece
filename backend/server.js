const adminRegistration = require("./routes/admin/registration");
const adminLogin = require("./routes/admin/login");
const adminProfile = require("./routes/admin/profile");
const admins = require("./routes/admin/admins");

const category = require("./routes/admin/category");
const subcategory = require("./routes/admin/subcategory");
const brand = require("./routes/admin/brand");
const product = require("./routes/admin/product");

const getProducts = require("./routes/user/getProducts");
const getCategories = require("./routes/user/getCategories");
const getSubcategories = require("./routes/user/getSubcategories");

const slider = require("./routes/admin/slider");
const getSlider = require("./routes/user/getSlider");

// const flashSale=require('./routes/admin/flashSale')
// const getFlashSale=require('./routes/user/getFlashSale')

const userRegistration = require("./routes/user/registration");
const userLogin = require("./routes/user/login");
const userProfile = require("./routes/user/profile");

const userOrder = require("./routes/user/order");

const users = require("./routes/admin/users");

const adminOrder = require("./routes/admin/order");

const commentRating = require("./routes/user/commentRating");

const wishlist = require("./routes/user/wishlist");
const relatedProduct = require("./routes/user/relatedProduct");

const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config();
const cors = require("cors");
const connectDB = require("../config/db");
const express = require("express");
const app = express();

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

//Connect DB

connectDB();

//Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads/", express.static("uploads/"));

//Route

app.use("/api/admin", adminRegistration);
app.use("/api/admin", adminLogin);
app.use("/api/admin", adminProfile);
app.use("/api/admin", admins);

app.use("/api/admin", category);
app.use("/api/admin", subcategory);
app.use("/api/admin", brand);
app.use("/api/admin", product);

app.use("/api/user", getProducts);
app.use("/api/user", getCategories);
app.use("/api/user", getSubcategories);

app.use("/api/admin", slider);
app.use("/api/user", getSlider);

// app.use('/api/admin',flashSale)
// app.use('/api/user',getFlashSale)

app.use("/api/user", userRegistration);
app.use("/api/user", userLogin);
app.use("/api/user", userProfile);

app.use("/api/user", userOrder);

app.use("/api/admin", users);

app.use("/api/user", wishlist);
app.use("/api/user", relatedProduct);

app.use("/api/user", commentRating);

app.use("/api/user", wishlist);

//Port Connection

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
);