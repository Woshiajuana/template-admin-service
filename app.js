'use strict';

module.exports = app => {
    const { logger, config } = app;
    console.log('1=>app.js')
    app.beforeStart(async () => {
        logger.info('[App] beforeStart');
    });
};
