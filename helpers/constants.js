const HttpCodes = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const Ports = {
  default: 3000,
};

const validationConfig = {
  minNameLength: 2,
  maxNameLength: 30,
  minPasswordLength: 8,
  minDomainSegments: 2,
};

module.exports = { HttpCodes, Ports, validationConfig };
