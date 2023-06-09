 # passport-roblox

 Passport strategy for [Roblox](https://roblox.com)
 
 ## Usage
 `npm install passport-roblox`
 
 ### Configure
 This strategy uses the Roblox profile scope. The configuration requires clientID, clientSecret, a callback URL, and a scope.
 Client ID, Secret and applicable scopes can be found during creation of a Roblox OAuth2 application on the [Creator Dashboard](https://create.roblox.com/credentials).
 
```js
passport.use(new passportroblox({
  clientID: process.env.clientid,
  clientSecret: process.env.secret,
  callbackURL: "http://localhost:8080/callback",
  scope: ["openid"]
}, function (accessToken, refreshToken, profile, done) {
  done(null, profile)
}));
```

### Authentication requests
Use `passport.authenticate()` as middleware on your authentication endpoints with the strategy name `roblox`.

```js
app.get("/login", passport.authenticate('roblox'), (req, res, next) => { });

app.get("/callback", passport.authenticate('roblox', { failureRedirect: '/authfail'}), async (req, res) => {
    res.redirect('/dashboard')
})
```
 
