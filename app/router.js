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

// 基础 API 路由
const baseApiRoutes = [
    // 登录
    {
        name: '用户登录',
        path: '/api/v1/user-info/login',
        handler: ({ controller, middleware }) => [
            middleware.oplogMiddleware(),
            controller.userInfoController.login,
        ],
    },

    // 用户安全退出
    {
        name: '用户安全退出',
        path: '/api/v1/user-info/logout',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.oplogMiddleware(),
            controller.userInfoController.logout,
        ],
    },

    // 用户组
    {
        name: '查询管理员用户组列表',
        path: '/api/v1/user-group/list',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            // middleware.oplogMiddleware(),
            controller.userGroupController.list,
        ],
    },
    {
        name: '创建管理员用户组',
        path: '/api/v1/user-group/create',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.userGroupController.create,
        ],
    },
    {
        name: '更新管理员用户组',
        path: '/api/v1/user-group/update',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.userGroupController.update,
        ],
    },
    {
        name: '删除管理员用户组',
        path: '/api/v1/user-group/delete',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.userGroupController.del,
        ],
    },

    // 管理员用户
    {
        name: '查询管理员用户列表',
        path: '/api/v1/user-info/list',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            // middleware.oplogMiddleware(),
            controller.userInfoController.list,
        ],
    },
    {
        name: '创建管理员用户',
        path: '/api/v1/user-info/create',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.userInfoController.create,
        ],
    },
    {
        name: '更新管理员用户',
        path: '/api/v1/user-info/update',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.userInfoController.update,
        ],
    },
    {
        name: '删除管理员用户',
        path: '/api/v1/user-info/delete',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.userInfoController.del,
        ],
    },

    // Api 路由
    {
        name: '查询API路由列表',
        path: '/api/v1/api-route/list',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            // middleware.oplogMiddleware(),
            controller.apiRouteController.list,
        ],
    },
    {
        name: '初始化路由列表',
        path: '/api/v1/api-route/init',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.apiRouteController.init,
        ],
    },
    {
        name: '创建API路由',
        path: '/api/v1/api-route/create',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.apiRouteController.create,
        ],
    },
    {
        name: '更新API路由',
        path: '/api/v1/api-route/update',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.apiRouteController.update,
        ],
    },
    {
        name: '删除API路由',
        path: '/api/v1/api-route/delete',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.apiRouteController.del,
        ],
    },

    // 菜单路由
    {
        name: '查询菜单路由列表',
        path: '/api/v1/menu-route/list',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            // middleware.oplogMiddleware(),
            controller.menuRouteController.list,
        ],
    },
    {
        name: '创建菜单路由',
        path: '/api/v1/menu-route/create',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.menuRouteController.create,
        ],
    },
    {
        name: '更新菜单路由',
        path: '/api/v1/menu-route/update',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.menuRouteController.update,
        ],
    },
    {
        name: '删除菜单路由',
        path: '/api/v1/menu-route/delete',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.menuRouteController.del,
        ],
    },

    // 操作日志
    {
        name: '查询操作日志列表',
        path: '/api/v1/oplog/list',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            // middleware.oplogMiddleware(),
            controller.oplogController.list,
        ],
    },
    {
        name: '删除操作日志',
        path: '/api/v1/oplog/delete',
        handler: ({ controller, middleware }) => [
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.oplogController.del,
        ],
    },
];

const apiRoutes =  [
    ...businessApiRoutes,
    ...baseApiRoutes,
];

module.exports = app => {
    const { router, controller, middleware } = app;
    // 获取应用基础信息
    router.post('/api/v1/app/info', controller.appInfoController.info);
    // 初始化应用信息
    router.post('/api/v1/app/init', controller.appInfoController.init);
    // 管理员用户授权登录
    // router.post('/api/v1/user-info/login', middleware.oplogMiddleware(), controller.userInfoController.login);
    // 初始化路由
    apiRoutes.forEach((item) => {
        let { path, handler, method } = Object.assign({ method: 'POST' }, item);
        router[method.toLocaleLowerCase()](path, ...handler(app));
    });
};

module.exports.apiRoutes = apiRoutes;

