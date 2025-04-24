import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import MemberRoute from "./routes/member.route.js"
import userRoutes from "./routes/user.route.js"
import galleryRoute from "./routes/gallery.route.js"
import otherMemberRoute from "./routes/otherMember.route.js"
import newsRoute from "./routes/news.route.js"
import AnnualRoute from "./routes/annual.route.js"

dotenv.config();
const app=express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
      secret: process.env.SESSION_SECRET || "fallbackSecret", // Use environment variable
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production", // Only secure in production
        httpOnly: true, // Prevent JavaScript access
        sameSite: "lax", // Helps with cross-origin authentication
      },
    })
  );

  app.use("/member",MemberRoute)
  app.use("/user",userRoutes)
  app.use("/gallery",galleryRoute)
  app.use("/otherMember",otherMemberRoute)
  app.use("/news",newsRoute)
  app.use("/annual",AnnualRoute)
  app.use("/",(req,res)=>{
    res.json({message:"Welcome to the API"})
  })
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });


  export { app };