const CustomError = require('../../helpers/custom-error')
const MSG = require('../../helpers/message')

const defaultData = (req, res, next) => {
  try {
    let lang = req.body?.lang

    /**
     * - check allow lang
     * - not specify
     */
    if (lang && !Object.keys(MSG).includes(lang)) throw new CustomError(MSG.EN.LANG_NOT_FOUND, 400)
    else if (!lang) lang = 'EN'

    req.lang = lang

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = defaultData
