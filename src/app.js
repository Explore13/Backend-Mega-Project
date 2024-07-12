import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(
  cors({
    // read the docs of CORS for more setup
    origin: process.env.CORS_ORIGI0N,
    credentials: true,
  })
);

// pehle body parser use hota tha body se data lene ke liye, but abhi express mein ek middleware function hain express.json() bolte hain.
app.use(
  express.json({
    // read about this middleware from express docs.
    limit: "16kb",
  })
);

// aagar url se data lena hain, jaise .params karke hum lete hain data, waise lene ke liye ek middleware function hain .urlencoded bolke, usee use karte hain hum.
app.use(
  express.urlencoded({
    extended: true, // to take the nested object
    limit: "16kb",
  })
);

// to access the static files. Aggar koi assets hain hamare pas (images, pdf etc) then we use .static to access them. "public" denotes the folder name where we stored the static files.
app.use(express.static("public"));

// To access the cookies from user's browser and send the cookie to user's browser we use cookie-parser
app.use(cookieParser());
export { app };
