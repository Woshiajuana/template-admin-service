'use strict';

// 业务 API 路由
const businessApiRoutes = [
    // DEMO
    {
        name: 'DEMO示例',
        path: '/api/demo/*',
        method: 'ALL',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.oplogMiddleware(),
            controller.demo.transformController.transform,
        ],
    },
];

module.exports = app => {
    const { router, controller, middleware } = app;

    // 获取应用基础信息
    // router.post('/api/v1/app/info', controller.appInfoController.info);
    // // 初始化应用信息
    // router.post('/api/v1/app/init', controller.appInfoController.init);
    // // 管理员用户授权登录
    // // router.post('/api/v1/user-info/login', middleware.oplogMiddleware(), controller.userInfoController.login);
    // // 初始化路由
    // apiRoutes.forEach((item) => {
    //     let { path, handler, method } = Object.assign({ method: 'POST' }, item);
    //     router[method.toLocaleLowerCase()](path, ...handler(app));
    // });
};
