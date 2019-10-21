'use strict';

const fs = require('fs');
const path = require('path');
const strCmdPath = process.cwd();

module.exports = app => {

    const { logger, config, router } = app;

    // 路由节点
    router.arrRoutes = [];

    // 路由挂载
    router.mount = (routes, ...handler) => {
        let { path, method = 'POST' } = routes;
        router[ method.toLocaleLowerCase() ](path, ...handler);
        routes.usePush !== false && router.arrRoutes.push(routes);
        return router;
    };

    // 路由根据目录整体挂载
    router.mountRouteByControllerDirName = (dirName, options) => {
        let strDirName = dirName || './app/controller',
            funLoop,
            strDirPath = path.join(strCmdPath, strDirName),
            arrControllerFilePath = [];

        ;(funLoop = (strDirPath) => {
            fs.readdirSync(strDirPath).forEach((filename) => {
                let strFileNamePath = path.join(strDirPath, filename.toString());
                if (fs.statSync(strFileNamePath).isFile()) {
                    arrControllerFilePath.push({ filename, dirPath: strFileNamePath, strDirPath });
                } else {
                    funLoop(strFileNamePath);
                }
            });
        }) (strDirPath);

        arrControllerFilePath
            .filter(({ filename, dirPath }) => filename.endsWith('Controller.js') && !filename.startsWith('_'))
            .forEach(({ filename, dirPath, strDirPath }) => {
                const module = require(dirPath);
                if (module.route) {
                    let controller = app.controller;
                    strDirPath.replace(/\\/g, '/').split('\/').forEach(itemName => {
                        if (controller[itemName]) {
                            controller = controller[itemName];
                        }
                    });
                    controller = controller[filename.charAt(0).toLowerCase() + filename.slice(1, -3)];
                    module.route(app, app.middleware, controller);
                }
            });
    };

};
