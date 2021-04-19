import * as passport from 'passport'
import * as PassportLocal from 'passport-local';
import * as PassportJWT from 'passport-jwt';
import db from '../db'
import { Application } from 'express';
import { compareHash } from '../../utilities/passwords';
import { Payload } from '../../utilities';
import config from '../config'

export function configurePassport(app: Application) {
    //help with typings gives me an error that types don't match here
passport.serializeUser((user: Payload, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

//Login 
passport.use(new PassportLocal.Strategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        //Search database for matching email utilizing Query function 'find' in authors.ts
        const [authorFound] = await db.authors.find(email);
        //Hash, and then compare the submitted password to the password stored with that email
        if (authorFound && compareHash(password, authorFound.password)) {
            delete authorFound.password
            done(null, authorFound);
        } else {
            done(null, false);
        }
    } catch (error) {
        done(error);
    }
}));

//checking token to ensure it's valid
passport.use(new PassportJWT.Strategy({
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
}, (payload: Payload, done) => {

    try {
        done(null, payload)
    } catch (error) {
        done(error);
    }
}))
app.use(passport.initialize());

}

