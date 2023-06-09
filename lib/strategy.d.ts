import express = require("express");
import passport = require("passport");
import oauth2 = require("passport-oauth2");

export interface Profile extends passport.Profile {}

type OAuth2StrategyOptionsWithoutRequiredURLs = Pick<
	oauth2._StrategyOptionsBase,
	Exclude<keyof oauth2._StrategyOptionsBase, "authorizationURL" | "tokenURL">
>;
/**
 * Options for the Strategy.
 */
interface StrategyOptions extends OAuth2StrategyOptionsWithoutRequiredURLs {
	clientID: string;
	clientSecret: string;
	callbackURL: string;

	scope?: string[];

	authorizationURL?: string;
	tokenURL?: string;
}

interface StrategyOptionsWithRequest extends StrategyOptions {
	passReqToCallback: true;
}

type VerifyCallback = (err?: string | Error | null, user?: Express.User, info?: any) => void;

type VerifyFunction = (
	accessToken: string,
	refreshToken: string,
	profile: Profile,
	done: VerifyCallback
) => void;

type VerifyFunctionWithRequest = (
	req: express.Request,
	accessToken: string,
	refreshToken: string,
	profile: Profile,
	done: VerifyCallback
) => void;

/**
 * Options for the authorization.
 */
type AuthorizationOptions = {
	permissions: any;
	prompt: any;
};

export class Strategy {
	name: string;

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
	 *   - `scope`          Scopes to define for access token
	 *   - `authorizationURL`  URL to use for authorization (default: https://authorize.roblox.com)
	 *   - `tokenURL`          URL to use for token (default: https://apis.roblox.com/oauth/v1/token)
	 *
	 * @constructor
	 * @param {StrategyOptions} options
	 * @param {VerifyFunction} verify
	 * @access public
	 */
	constructor(options: StrategyOptions, verify: VerifyFunction);
	constructor(options: StrategyOptionsWithRequest, verify: VerifyFunctionWithRequest);

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
	userProfile(accessToken: string, done: (err?: Error | null, profile?: Profile) => void): void;

	/**
	 * Return extra parameters to be included in the authorization request.
	 *
	 * @param {authorizationParams} options
	 * @return {Object}
	 * @api protected
	 */
	authorizationParams(options: AuthorizationOptions): any;
}
