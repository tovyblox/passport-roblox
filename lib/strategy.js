/**
 * Dependencies
 * Based on https://github.com/nicholastay/passport-discord
 */
 var OAuth2Strategy      = require('passport-oauth2')
 , InternalOAuthError  = require('passport-oauth2').InternalOAuthError
 , util                = require('util');

 
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
function Strategy(options, verify) {
   options = options || {};
   options.authorizationURL = options.authorizationURL || 'https://authorize.roblox.com';
   options.tokenURL = options.tokenURL || 'https://apis.roblox.com/oauth/v1/token';
   options.pkce = options.pkce || false;

   OAuth2Strategy.call(this, options, verify);
   this.name = 'roblox';
   this._oauth2.useAuthorizationHeaderforGET(true);
}

/**
* Inherits from `OAuth2Strategy`
*/
util.inherits(Strategy, OAuth2Strategy);

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
Strategy.prototype.userProfile = function(accessToken, done) {
   var self = this;
   this._oauth2.get('https://apis.roblox.com/oauth/v1/userinfo', accessToken, function(err, body, res) {
       if (err) {
           return done(new InternalOAuthError('Failed to fetch the profile.', err))
       }

       let data;
       try {
        data = JSON.parse(body);
       }
       catch (e) {
           return done(new Error('Failed to parse the roblox profile.'));
       }

       const profile = {
        id: data.sub,
        provider: 'roblox',
        accessToken: accessToken,
        refreshToken: data.refreshToken
       };
       
       return done(null, profile)
   });
};

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
Strategy.prototype.authorizationParams = function(options) {
   var params = {};
   if (typeof options.permissions !== 'undefined') {
       params.permissions = options.permissions;
   }
   if (typeof options.prompt !== 'undefined') {
       params.prompt = options.prompt;
   }
   return params;
};


/**
* Expose `Strategy`.
*/
module.exports = Strategy;