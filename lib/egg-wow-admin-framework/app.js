'use strict';

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

};