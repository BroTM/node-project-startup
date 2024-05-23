'use strict'

/** db boolean values */
const BOL = {
  TRUE: 1,
  FALSE: 0,
}

/** admin status */
const ADMIN_STATUS = {
  NO_VERIFY: 'no-verify',
  VERIFIED: 'verified',
  LOCK: 'locked',
}

/** table names */
const TABLES = {
  ADMIN: `admins`,
}

/** model names */
const MODELS = {
  ADMIN: `Admin`,
}

module.exports = {
  BOL,
  ADMIN_STATUS,
  TABLES,
  MODELS,
}
