const
    join = require('path').join,
    root = join(__dirname, '..');

const config = {
    port: process.env.PORT || 3000,
    host: process.env.WEBSITE_HOSTNAME || `localhost`,
    githubURL: 'https://github.com',
    apiURL: 'https://api.github.com',
    owner: 'askbeka',
    storage: 'storage',
    auth: {
        jwt: process.env.JWT_SECRET || 'FI Architecture View',

        // https://developer.github.com
        id: process.env.GITHUB_APP_ID || 'c750b22181d691ed6b21',
        secret: process.env.GITHUB_APP_SECRET || '963fa6019c9639f72deccc8d1427558958b8f1ff',

    },
    paths: {
        root: root,
        dist: join(root, 'dist')
    }
};

config.auth.verifyTokenURL = `${config.apiURL}/applications/${config.auth.id}/tokens`;
config.dataURL = `${config.apiURL}/repos/${config.owner}/${config.storage}/contents/graph.json`;

module.exports = config;
