const dbConnection = require("./connection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};

/* Now, you can list your collections here: */
module.exports = {
  //signup: getCollectionFn("signup"),
  application: getCollectionFn("application"),
  //employerInfo: getCollectionFn("employerInfo"),
  applicantDocuments: getCollectionFn("applicantDocuments.files"),
  users: getCollectionFn("users"),
  jobDescrption: getCollectionFn("jobDescription"),
  jobsAndDocs: getCollectionFn("jobsAndDocs")
};
