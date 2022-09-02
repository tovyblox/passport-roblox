 # passport-roblox

 Passport strategy for [Roblox](https://roblox.com)
 
 ## Usage
 `npm intall passport-roblox`
 
 ### Configure
 This stratergy uses the Roblox profile scope. The configuration requires clientID, clientSecret, a callback URL, and a scope
```js
passport.use(new passportroblox({
  clientID: process.env.clientid,
  clientSecret: process.env.secret,
  callbackURL: "http://localhost:8080/callback",
  state: true,
  scope: 'openid',
  pkce: true
}, function (accessToken, refreshToken, profile, done) {
  profile.
  done(null, profile)
}));
```

### Authenticiation requests
Use `passport.authenticate()` and use `roblox` for it

```js
app.get("/login", passport.authenticate('roblox'), (req, res, next) => { });

app.get("/callback", passport.authenticate('roblox', { failureRedirect: '/authfail'}), async (req, res) => {
    res.redirect('/shh')
})
```
 
