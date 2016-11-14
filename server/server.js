const
    express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    OAuth2Startegy = require('passport-oauth2'),
    expressJWT = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    fetch = require('node-fetch'),
    config = require('./config'),
    app = express();

app.set('view engine', 'pug');
app.set('views', './templates');

app.use((req, res, next) => {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(express.static(config.paths.dist));
app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const isLoggedIn = (req) => {

    if (req.user && req.user.token) {
        const
            id = config.auth.id,
            secret = config.auth.secret,
            auth = new Buffer(`${id}:${secret}`).toString('base64'),
            headers = new fetch.Headers({'Authorization': `Basic ${auth}`});

        return fetch(`${config.auth.verifyTokenURL}/${req.user.token}`, {headers: headers}).then((response) => {
            return response.status === 200;
        });

    } else {
        return Promise.resolve(false);
    }

};

app.use(expressJWT({
    secret: config.auth.jwt,
    credentialsRequired: false,
    getToken: req => req.cookies.id_token,
}));

passport.use(new OAuth2Startegy({
        authorizationURL: `${config.githubURL}/login/oauth/authorize`,
        tokenURL: `${config.githubURL}/login/oauth/access_token`,
        clientID: config.auth.id,
        clientSecret: config.auth.secret,
        callbackURL: `http://${config.host}:${config.port}/auth/callback`
    },
    (token, refreshToken, profile, cb) => {
        return cb(null, {token: token});
    }));

app.use(passport.initialize());

app.get('/auth',
    passport.authenticate('oauth2', {scope: ['user:email', 'repo'], session: false, allow_signup: false}));

app.get('/auth/callback',
    passport.authenticate('oauth2', {failureRedirect: '/auth', session: false, failureFlash: true}),
    (req, res) => {
        const
            expiresIn = 60 * 60 * 24 * 180, // 180 days
            token = jwt.sign(req.user, config.auth.jwt, {expiresIn: expiresIn});

        res.cookie('id_token', token, {maxAge: 1000 * expiresIn, httpOnly: true});
        res.redirect('/graph');
    });

app.get('/graph', (req, res, next) => {
    isLoggedIn(req).then(loggedIn => loggedIn ? next() : res.redirect('/auth')).catch(err => {
        throw err
    });
});

app.get('/', (req, res) => {
    res.redirect('/graph');
});

app.get('/data', (req, res) => {
    const token = req.headers['x-access-token'];
    const headers = new fetch.Headers({'Authorization': `token ${token}`});
    fetch(config.dataURL, {headers: headers})
        .then(response => response.json())
        .then(data => ({sha: data.sha, graph: JSON.parse(new Buffer(data.content, 'base64').toString())}))
        .then(data => res.status(200).json(data))
        .catch(err => res.status(400).json(err));
});

app.use((req, res, next) => {
    res.set('Set-Cookie', 'token='+req.user.token);
    require('connect-history-api-fallback')()(req, res, next)
});

app.use((err, req, res, next) => {
    console.error(err.stack || err);
    res.status(err.status || 500);
    res.render('error', {title: 'Internal Server Error', error: err});
});

module.exports = app;
