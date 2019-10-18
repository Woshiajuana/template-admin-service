'use strict';

module.exports = app => {
    const { logger, config } = app;
    app.beforeStart(async () => {
        logger.info('[App] beforeStart');
    });
};
