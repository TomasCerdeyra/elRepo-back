import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const configurePassport = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
      const isAdmin = ['tcerdeyra@alumnos.unsada.edu.ar', 'cerdeyra@alumnos.unsada.edu.ar'].includes(profile.emails[0].value);

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
