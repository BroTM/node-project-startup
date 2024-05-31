const ERROR_MESSAGE = {
  SPACE: (field) => `Can't be space around at ${field} input`,
  INVALID_ID: (field) => `${field} is invalid identity`,
  NUMBER: (field) => `${field} must be number`,
  LENGTH_ERROR: (fieldName, length) => {
    return `${fieldName} cannot exceed ${length} words`
  },
  REQUIRED: (field) => {
    return `${field} cannot be empty`
  },
  MUST_UNIQUE: (fieldName) => {
    return `${fieldName} must be unique`
  },
  NOT_FOUND: (fieldName) => {
    return `${fieldName} does not exist`
  },
}
module.exports = ERROR_MESSAGE
