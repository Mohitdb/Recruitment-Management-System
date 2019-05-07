const mongoCollections = require("./collection");
const jobDescription = mongoCollections.jobDescrption;
const { ObjectId } = require('mongodb')

module.exports = {
    //please remember to add employerID before job title in the function parameter in thle line below
    async createjobDescription(jobTitle, jobType, jobLocation, experienceLevel, jobResponsibilities)
    {
        //console.log("hi")
        const jobpost = await jobDescription();
        const jobSummary = {
            //employerId : employerId,
            jobTitle : jobTitle,
            jobType: jobType,
            jobLocation: jobLocation,
            experienceLevel : experienceLevel,
            jobResponsibilities : jobResponsibilities
        }
        const insert = await jobpost.insertOne(jobSummary);
        if(insert.insertedCount === 0){
            throw "Could not add job description";
        }

        return await this.getJobById(insert.insertedId);
    },
    async getJobById(id){
        if(!id){
            throw "Error: no id was provided";
        }
        const parsedId = ObjectId.createFromHexString(id);
        const info = await jobDescription();
        const job = info.findOne({_id: parsedId});
        if(!job){
            throw `Error: no Applicant was found with this id: ${parsedId}`
        }
        return job;
    },

    // function to get all jobs in the jobDescription collection
    async getAllJobs(){
        const info = await jobDescription();
        return info.find({}).toArray();
    }
}