const { getCollections } = require("../sqlite/db.js");
const { errorResponse, successResponse } = require("../utility/utils.js");

 const retrieveCollections = async (req, res) => {
  try {
    const data = await getCollections();
    return successResponse(res, data);
  } catch (error) {
    return errorResponse(error);
  }
};

module.exports = { retrieveCollections };
