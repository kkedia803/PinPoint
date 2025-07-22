const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express();
app.use(express.json());
const pinRoute = require("./routes/pin")
const userRoute = require("./routes/user")
const cors = require("cors")

app.use(cors()); // ✅ Enable CORS from anywhere
app.use(express.json());
dotenv.config();

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDb connected")
    })
    .catch((err) => console.log(err));

app.use("/pin", pinRoute)
app.use("/user", userRoute)

app.listen(8800, () => {
    console.log("Backend server running!")
})