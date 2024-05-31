const yup = require('yup')
const ERROR_MESSAGE = require('./error-message')

yup.addMethod(yup.string, 'digit', function digit(message) {
  return this.matches(/^[0-9]+$/, {
    message: message || '${path} must be number or digit',
    name: 'digit',
    excludeEmptyString: true,
  })
})

yup.addMethod(yup.string, 'SC', function SC(message) {
  return this.matches(/^[^!@#$%^&*()_+={}\[\];"'<>?|\\`]*$/, {
    message: message || '${path} include banned special characters',
    name: 'SC',
    excludeEmptyString: true,
  })
})

yup.setLocale({
  string: {
    trim: (elm) => ERROR_MESSAGE.SPACE(elm.path),
    uuid: (elm) => ERROR_MESSAGE.INVALID_ID(elm.path),
  },
  mixed: {
    required: (elm) => ERROR_MESSAGE.REQUIRED(elm.path),
  },
})
module.exports = yup
