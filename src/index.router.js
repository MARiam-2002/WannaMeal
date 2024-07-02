import authRouter from "./modules/auth/auth.router.js";
import mealsRouter from "./modules/meals/meals.router.js";
import familyRouter from "./modules/familly/familly.router.js";
import postRouter from "./modules/post/post.router.js";
import messageRouter from "./modules/message/message.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import passport from "passport";
import pass from "../config/passport.stupp.js";
import session from "express-session";
import cors from "cors";

import ApiError from "./utils/apiError.js";
import tipRoutes from './modules/tip/tipRoutes.js';
import categoryRoute from './modules/category/categoryRoute.js';
import ingredientRoute from './modules/ingredient/ingredientRoute.js';
import userRoute from './modules/auth/userRoute.js'


const initApp = (app, express) => {
  app.use(cors());
  //convert Buffer Data
  app.use(express.json());
  app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  //Setup API Routing
  app.use(`/auth`, authRouter);
  app.use(`/meals`, mealsRouter);
  app.use(`/family`, familyRouter);
  app.use(`/post`, postRouter);
  app.use(`/message`, messageRouter);
  app.use(`/Tips` ,tipRoutes);
  app.use(`/Categories`, categoryRoute);
  app.use(`/Ingredients`, ingredientRoute);
  app.use(`/users`, userRoute);
  app.use("/",(req,res,next)=>{
    res.send("Welcome to our API")
  
  })

  app.all("*", (req, res, next) => {
    next(new ApiError(`can't find this route :${req.originalUrl} `, 400));
  });
  app.all("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method");
  });
  app.use(globalErrorHandling);
};

export default initApp;
