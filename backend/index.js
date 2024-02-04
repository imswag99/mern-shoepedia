const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute');
const productRouter = require('./routes/productRoute');
const orderRouter = require('./routes/orderRoute');

dotenv.config();
require('./config/dbConnect')();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/uploads", express.static(__dirname + "/uploads")); // Forgot to use this one
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173",
}));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

app.listen(5000);