const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204, //success, but no content to return" and is the most common choice for DELETE operations 
  BAD_REQUEST: 400, //invalid data
  UNAUTHORIZED: 401, //authorization problems (incorrect credentials, invalid token)
  FORBIDDEN: 403, //(user trying to delete someone else's item)
  NOT_FOUND: 404, //resource not found
  INTERNAL_SERVER_ERROR: 500, //server error
  CONFLICT: 409 //conflict (duplicate email)
};



module.exports = { HTTP_STATUS };