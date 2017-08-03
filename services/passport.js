const passport=require("passport");
const GoogleStrategy=require("passport-google-oauth20");
const keys=require("../config/keys");
const mongoose=require('mongoose');
const User=mongoose.model("users");


//this uses the user id to create a cookie
passport.serializeUser((user,done)=>{

  done(null,user.id);
});
//this uses the cookie information to get the user information
passport.deserializeUser((id,done)=>{

  User.findById(id)
  .then((user)=>{

    done(null,user);
  })
})

//to sign in using google the google stategy must be used
passport.use(new GoogleStrategy({
  ///client ID and client secret must be gain from api data
  clientID:keys.GOOGLECLIENTID,
  clientSecret:keys.GOOGLECLIENTSECRET,
callbackURL:'/auth/google/callback',
proxy:'true'},(accessToken,refreshToken,profile,done)=>{
//using mongoose we check if user exists
//if so get the information
//if not then make a new user a save
//done allows for asyncrinous code
//null is the error
//second argument is user
    User.findOne({userId: profile.Id})
    .then((existingUser)=>{
      if(existingUser){

        done(null,existingUser);
      }
      else{
        //new users

        const newUser=new User({id:profile.id});
        newUser.save()
        .then(user=>done(null,user));
      }
    })


})
);
