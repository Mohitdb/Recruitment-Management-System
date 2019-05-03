const express = require("express");
const router = express.Router();
const data = require("../data");
const  jobDescription = data.jobDescription;

router.post("/:jobId?", async (req, res) => {
    //console.log(req.query.jobId);
    //const parsedId = ObjectId.createFromHexString(id);
    const result = await jobDescription.getJobById(req.query.jobId)
    console.log("hello")
    console.log(result)
    res.status(200).render("applicantViewJobDescription",{
        result : result
    })
    //res.status(200).json({message: "hello"})
  });

  
  module.exports = router;