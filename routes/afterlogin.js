const express = require("express");
const router = express.Router();
const data = require("../data");
const jobDescription = data.jobDescription;
const application = data.application;

router.get("/", async (req, res) => {
    //res.status(200).json({message:"go home"})
    if(req.session.authority == true)
    {
        if(req.session.userType === "Applicant")
        {
            const result = await jobDescription.getAllJobs();
            //console.log(result)
            //console.log(req.session)

            //From here, I will get the application for the specific user; 
            var userID = req.session.userID;
            var applicationResult = await application.get(userID);
            if(applicationResult == null){
                applicationResult = ["Does not apply any job! Right Now"]
            }
            //console.log(applicationResult);
            res.status(200).render("./applicantViewJobPostings",
            {
              result : result,
              logoutOption: true,
              applicationResult : applicationResult
            })
            return
        }
        if(req.session.userType === "Recruiter")
        {
            // console.log(req.session.userID)
            const userObject = await data.usersData.get(req.session.userID);
            // console.log(userObject.firstName)
            res.status(200).render("./recruiterPostOrViewPage",
            {
                logoutOption: true,
                recruiterName : userObject.firstName
            });
            return
        }
    }
    // const usersData = req.body;
    // tryy
    
    //   if(req.body === undefined){
    //     res.status(400).json({message : "There isn't body in the request"})
    //   }
    //   if(typeof(req.body.userName) !== "string"){
    //     res.status(400).json({message : "User name should be string"})
    //   }
    //   if(typeof(req.body.email) !== "string"){
    //     res.status(400).json({message : "Email should be string"})
    //   }
    //   if(typeof(req.body.password) !== "string"){
    //     res.status(400).json({message : "Password should be string"})
    //   }
    //   //console.log(signupData);
    //   const createdUser = await signupCurrent.signup("Applicant",req.body.userName,req.body.email,req.body.password)
    //   res.status(200).render("loginPage/aftersignup", {});
    //   //res.status(200).json({message:"go home"})
    // }
    // catch(error)
    // {
    // res.status(404).json({message:error})
    // }
    res.status(401).render('errorPage', { e: { statusCode: "401", error: "You are not logged in, please login", redirect: "/" } })
  });
  
  module.exports = router;