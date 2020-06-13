
/**
 * @typedef {object} RegisterGameRequest
 * @property {string} gameName.required
 * @property {string} gameKey.required
 * @property {Array<string>} types
 */

/**
 * @typedef {object} JoinGameRequest
 * @property {string} gameKey.required
 * @property {string} username.required
 * @property {string} gameName.required
 */

/**
 * @typedef {object} SuccessGameRegistered
 * @property {boolean} success
 */

/**
 * @typedef {object} SuccessJoinGame
 * @property {string} accessKey
 */

/**
 * @typedef {object} Error
 * @property {number} statusCode - <span style="color: gray;font-style: italic">404</span>
 * @property {string} error - <span style="color: gray;font-style: italic">example: Error description message</span>
 */
