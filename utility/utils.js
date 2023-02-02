 function errorResponse(res, error, status = 400) {
  return res.status(status).json({ success: false, message: error instanceof Error ? error.message : error });
}

 function successResponse(res, data, status = 200) {
  const retObject = { success: true };
  if (data) retObject.data = data;
  return res.status(status).json(retObject);
}



module.exports = {
  successResponse,
  errorResponse
}