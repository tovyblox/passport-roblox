const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { Strategy } = require("passport-roblox");

const PORT = 5000;
const CLIENTID = "clientid"; // DO NOT COMMIT THIS
const SECRET = "secret"; // DO NOT COMMIT THIS

const app = express();

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	done(null, { id });
});

const scopes = ["openid", "profile"];
passport.use(
	new Strategy(
		{
			clientID: CLIENTID,
			clientSecret: SECRET,
			callbackURL: "http://localhost:5000/callback",
			scope: scopes,
		},
		async (accessToken, refreshToken, profile, callback) => {
			console.log("ACCESS TOKEN:", accessToken);
			console.log("REFRESH TOKEN:", refreshToken);
			console.log("PROFILE:", profile);

			callback(null, profile);
		}
	)
);

app.use(
	session({
		secret: "mysecret",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
	"/login",
	passport.authenticate("roblox", {
		scope: scopes,
	})
);

app.get(
	"/callback",
	passport.authenticate("roblox", {
		failureRedirect: "/authfail",
	}),
	async (req, res) => {
		console.log("Auth success!", req.user);
		res.sendStatus(200);
	}
);

app.get("/authfail", (req, res) => {
	console.log("Auth fail!", req.query);
	res.sendStatus(200);
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
