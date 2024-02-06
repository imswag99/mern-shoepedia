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
  origin: "https://shoepedia.vercel.app",
}));
app.use(cookieParser());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
