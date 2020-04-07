import * as passport from 'passport'
import * as passportJWT from 'passport-jwt'
import * as auth                                 from './../auth/tokendbserver'

const  ExtractJwt = passportJWT.ExtractJwt;
const   Strategy = passportJWT.Strategy;
const  params = {
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromHeader('x-auth-token')
};


const strategy = new Strategy(params, function(payload : any, done : any) {
    var user = payload.user || null;
    console.log(`Find token for user  [${user}]`);
    auth.getToken(user,function(err,result){
      console.log("@@@@@@@ Result : " + JSON.stringify(result))
      if (result && user && user === result.user && 'VALID' === result.status ) {
          console.log(`Found valid user token.`)
          return done(null, {
              businessName : user,
              businessId : payload.businessId
          });
      } else {
          console.log(`Token for user ${payload.user} is not valid.`)
          return done(new Error("User's token is not valid"), null);
      }
    })
});
passport.use(strategy);


export let initialize = () =>{
  return passport.initialize();
}

export let authenticate = () =>{
  return passport.authenticate("jwt", false);
}
