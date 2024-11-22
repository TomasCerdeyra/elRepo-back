import config from './config.js';
import passport from 'passport'
import fs from 'fs'
import path from 'path';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';


const filePath = config.ULR_ADMINS;
let adminsEmails;
try {
  adminsEmails = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
} catch (error) {
  console.error('Error al leer el archivo adminsEmails.json:', error.message);
  adminsEmails = { admins: [] };
}

const configurePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      if (!profile.emails[0].value.endsWith('unsada.edu.ar')) {
        return done(null, false, { message: 'Access denied' });
      }

      let user = await User.findOne({ googleId: profile.id });
      if (user) {
        return done(null, user);
      }

      //Estos correros mas adelante tomarlos desde un archivo fuera del programa
      const isAdmin = adminsEmails.admins.includes(profile.emails[0].value);

      user = new User({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        isAdmin: isAdmin
      });
      await user.save();
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};

export default configurePassport;
