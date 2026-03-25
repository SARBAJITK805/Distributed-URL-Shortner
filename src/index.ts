import express from "express";
import "dotenv/config";
import cors from "cors";
import urlRoutes from "./routes/urlRoutes.js"

const app=express();
const PORT=process.env.PORT||5000;

app.use(express.json());
app.use(cors());
app.use('api/v1/',urlRoutes);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
});