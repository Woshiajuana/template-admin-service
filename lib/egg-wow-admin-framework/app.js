'use strict';

const fs = require('fs');
const path = require('path');
const strCmdPath = process.cwd();

if (typeof String.prototype.startsWith != 'function') {
    String.prototype.startsWith = function (prefix){
        return this.slice(0, prefix.length) === prefix;
    };
}

if (typeof String.prototype.endsWith != 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

module.exports = app => {

    const { logger, config, router } = app;

    // 路由
    router.arrRoutes = [];

    // 路由挂载
    router.mount = (routes, ...handler) => {
        let { path, method = 'POST' } = routes;
        console.log('到达了这里 =>', routes)
        router[ method.toLocaleLowerCase() ](path, ...handler);
        routes.usePush !== false && router.arrRoutes.push(routes);
        return router;
    };

    // 路由
    router.mountRouteByController = (controller) => {
        console.log('mountRouteByController => ', controller.apiRouteController.constructor)
        let funLoop;
        (funLoop = (ctr) => {
            for (let key in ctr) {
                let item = ctr[key];
                if (item.constructor && item.constructor.route) {
                    item.constructor.route(router, app.middleware, controller);
                }
                if (typeof item === 'object') {
                    funLoop(item);
                }
            }
        }) (controller);
    };

    router.mountRouteByControllerDirName = (dirName, options) => {
        let strDirName = dirName || './app/controller',
            funLoop,
            strDirPath = path.join(strCmdPath, strDirName),
            arrControllerFilePath = [];

        ;(funLoop = (strDirPath) => {
            fs.readdirSync(strDirPath).forEach((filename) => {
                let strFileNamePath = path.join(strDirPath, filename.toString());
                if (fs.statSync(strFileNamePath).isFile()) {
                    arrControllerFilePath.push({ filename, dirPath: strFileNamePath });
                } else {
                    funLoop(strFileNamePath);
                }
            });
        }) (strDirPath);

        arrControllerFilePath
            .filter((filename, dirPath) => filename.endsWith('Controller.js') && !filename.startsWith('_'))
            .forEach((filename, dirPath) => {
                const module = require(dirPath.toString());
                if (module.route) {
                    module.route(app);
                }
            });
    };

};
