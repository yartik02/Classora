import dotenv from "dotenv";
dotenv.config({path: './.env'});

import express from "express"
import cors from "cors";
import { connectDB } from "./src/db/connection.js";
import authRouter from "./src/routes/auth-router.js";
import adminRoute from "./src/routes/admin-router.js";

const app = express();

const corsOptions = {
    origin:process.env.FrontEndURL,
    methods: ["GET","POST","PUT","DELETE", "PATCH"],
    credentials:true,
}

app.use(cors(corsOptions));

app.use(express.json());


app.use("/api/auth", authRouter);
// app.use("/api/complaints", router);
app.use("/api/admin", adminRoute);


const PORT = process.env.PORT || 4000;


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error("❌ Failed to connect to DB. Server not started.", err);
});