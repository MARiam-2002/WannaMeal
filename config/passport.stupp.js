import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
//set directory dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "./.env") });
import userModel from "../DB/model/User.model.js";
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userModel.findById(id);
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      callbackURL:
        "https://fast-plat1.vercel.app/auth/google/redirect",
      clientID: process.env.CLIENTID,
      clientSecret: process.env.CLIENTSECRET,
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const checkUser = await userModel.findOne({
        $or: [{ googleId: profile.id }, { email: profile._json.email }],
      });
      if (checkUser) {
        done(null, checkUser);
      } else {
        const user = await userModel.create({
          userName: profile.displayName,
          googleId: profile.id,
          "profileImage.url": profile._json.picture,
          email: profile._json.email,
        });
        done(null, user);
      }
    }
  )
);

// Configure Passport for JWT

export default passport;
