const CustomError = require('../../helpers/custom-error')
const MSG = require('../../helpers/message')

const defaultData = (req, res, next) => {
  try {
    let lang = req.body?.lang

    /**
     * - not specify
     * - check allow lang
     */
    if (!lang) lang = 'EN'
    else if (!Object.keys(MSG).includes(lang)) throw new CustomError(MSG.EN.LANG_NOT_FOUND, 400)

    req.lang = lang

    next()
  } catch (err) {
    next(err)
  }
}

module.exports = defaultData
