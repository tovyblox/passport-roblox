export = Strategy;
/**
* Options for the Strategy.
* @typedef {Object} StrategyOptions
* @property {string} clientID
* @property {string} clientSecret
* @property {string} callbackURL
* @property {boolean} [pcke=true]
* @property {string} [authorizationURL="https://authorize.roblox.com"]
* @property {string} [tokenURL="https://apis.roblox.com/oauth/v1/token"]
*/
/**
* `Strategy` constructor.
*
* The roblox oauth strategy
*
* Applications must supply a `verify` callback which accepts an `accessToken`,
* `refreshToken` and service-specific `profile`, and then calls the `cb`
* callback supplying a `user`, which should be set to `false` if the
* credentials are not valid. If an exception occured, `err` should be set.
*
* Options:
*   - `clientID`       Roblox client ID
*   - `clientSecret`   Roblox client secret
*   - `callbackURL`    URL that roblox will redirect to after authorization
*   - `pcke`           Whether or not to use PKCE (default: true)
*   - `authorizationURL`  URL to use for authorization (default: https://authorize.roblox.com)
*   - `tokenURL`          URL to use for token (default: https://apis.roblox.com/oauth/v1/token)
*
* @constructor
* @param {StrategyOptions} options
* @param {function} verify
* @access public
*/
declare function Strategy(options: StrategyOptions, verify: Function): void;
declare class Strategy {
    /**
    * Options for the Strategy.
    * @typedef {Object} StrategyOptions
    * @property {string} clientID
    * @property {string} clientSecret
    * @property {string} callbackURL
    * @property {boolean} [pcke=true]
    * @property {string} [authorizationURL="https://authorize.roblox.com"]
    * @property {string} [tokenURL="https://apis.roblox.com/oauth/v1/token"]
    */
    /**
    * `Strategy` constructor.
    *
    * The roblox oauth strategy
    *
    * Applications must supply a `verify` callback which accepts an `accessToken`,
    * `refreshToken` and service-specific `profile`, and then calls the `cb`
    * callback supplying a `user`, which should be set to `false` if the
    * credentials are not valid. If an exception occured, `err` should be set.
    *
    * Options:
    *   - `clientID`       Roblox client ID
    *   - `clientSecret`   Roblox client secret
    *   - `callbackURL`    URL that roblox will redirect to after authorization
    *   - `pcke`           Whether or not to use PKCE (default: true)
    *   - `authorizationURL`  URL to use for authorization (default: https://authorize.roblox.com)
    *   - `tokenURL`          URL to use for token (default: https://apis.roblox.com/oauth/v1/token)
    *
    * @constructor
    * @param {StrategyOptions} options
    * @param {function} verify
    * @access public
    */
    constructor(options: StrategyOptions, verify: Function);
    name: string;
    /**
    * Retrieve user profile from Roblox.
    *
    * This function consturcts then returns a profile with the following properties
    *   - `provider`         always set to `roblox`
    *   - `id`               the user's Roblox ID
    *
    * @param {string} accessToken
    * @param {function} done
    * @access protected
    */
    userProfile(accessToken: string, done: Function): void;
    /**
    * Options for the authorization.
    * @typedef {Object} authorizationParams
    * @property {any} permissions
    * @property {any} prompt
    */
    /**
    * Return extra parameters to be included in the authorization request.
    *
    * @param {authorizationParams} options
    * @return {Object}
    * @api protected
    */
    authorizationParams(options: authorizationParams): any;
}
declare namespace Strategy {
    export { StrategyOptions, authorizationParams };
}
/**
 * Options for the Strategy.
 */
type StrategyOptions = {
    clientID: string;
    clientSecret: string;
    callbackURL: string;
    pcke?: boolean;
    authorizationURL?: string;
    tokenURL?: string;
};
/**
 * Options for the authorization.
 */
type authorizationParams = {
    permissions: any;
    prompt: any;
};
