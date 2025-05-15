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
import NoticeRoute from "./routes/notice.route.js"
import morgan from 'morgan';
dotenv.config();
const app=express();
const corsOptions = {
    origin: process.env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.use(morgan('dev'));
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

  app.use("/api/member",MemberRoute)
  app.use("/api/user",userRoutes)
  app.use("/api/gallery",galleryRoute)
  app.use("/api/otherMember",otherMemberRoute)
  app.use("/api/news",newsRoute)
  app.use("/api/annual",AnnualRoute)
  app.use("/api/notice",NoticeRoute)
  
  app.use("/api",(req,res)=>{
    res.json({message:"Welcome to the API"})
  })
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
  });


  export { app };