const express = require("express");
const router = express.Router();
const data = require("../data");
const  usersDataHandler = data.usersData;
//const signupCurrent = signupCurrent.signup;

isAuthJobSeeker = (req, res, next) => {
  // console.log(req.session.authority)
  if (req.session.authority == undefined || req.session.authority == false) {
      res.status(401).render('errorPage', { e: { statusCode: "401", error: "You are not logged in, please login", redirect: "/" } })
  }
  else if (req.session.userType === 'Recruiter') {
      res.status(403).render('errorPage', { e: { statusCode: "403", error: "Forbidden", redirect: "/" } })
  }
  else {
      next();
  }
};

// router.use(isAuthJobSeeker)




router.post("/", async (req, res) => {

  const usersData = req.body;
  // console.log(usersData)
  try{
    if(req.body === undefined){
      res.status(400).json({message : "There isn't body in the request"})
    }
    if(typeof(req.body.userName) !== "string"){
      res.status(400).json({message : "User name should be string"})
    }
    if(typeof(req.body.email) !== "string"){
      res.status(400).json({message : "Email should be string"})
    }
    if(typeof(req.body.password) !== "string"){
      res.status(400).json({message : "Password should be string"})
    }
    if(typeof(req.body.firstName) !== "string"){
      res.status(400).json({message : "First name should be string"})
    }
    if(typeof(req.body.lastName) !== "string"){
      res.status(400).json({message : "Last name should be string"})
    }
    if(typeof(req.body.phoneNumber) !== "string"){
      res.status(400).json({message : "Phone number should be string"})
    }
    var checkUserExists = await usersDataHandler.getUserbyname(req.body.userName)
    if(checkUserExists == null)
    {
    var createdUser = await usersDataHandler.signup("Applicant",req.body.userName,req.body.email,req.body.password,req.body.firstName,req.body.lastName,req.body.phoneNumber);
    res.status(200).render("loginPage/aftersignup", {});
  }
    else{
      res.render("loginPage/signup",{
        hasError: true,
        error: "User name is already taken"
      })
    }
  }
  catch(error)
  {
  res.status(404).json({message:error})
  }

});

module.exports = router;