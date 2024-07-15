const passport = require("passport");
const JWTExtract = require('passport-jwt').ExtractJwt;
const JWTStratergy = require('passport-jwt').Strategy;
const User = require("../model/user")

const opts={
    jwtFromRequest: JWTExtract.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secretKEY
}

passport.use(new JWTStratergy(opts, async (jwt_payload,done)=>{
    try {
        const user = await User.findById(jwt_payload._id)
        if(user){
            return done(null,user)
        }else{
            return done(null,false)
        }
    } catch (error) {
        return done(error)
    }
}));

module.exports =passport;