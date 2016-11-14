#!/usr/bin/env node

const app = require('../server/server');
const config = require('../server/config');

app.listen(config.port, config.port, function (err) {
    if (err) {
        return console.error(err);
    }

    console.log(`Listening at http://${config.host}:${config.port}`);
});
