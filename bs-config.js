var history = require('connect-history-api-fallback');

module.exports = {
    port: 7000,
    server: {
        middleware: {
            // overrides the second middleware default with new settings
            1: history({
                index: '/src/index.html',
                verbose: true
            })
        }
    }
};
