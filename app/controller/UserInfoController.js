'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: '用户安全登录', path: '/api/v1/user-info/login' },
            middleware.oplogMiddleware(),
            controller.login
        ).mount(
            { name: '用户安全退出', path: '/api/v1/user-info/logout' },
            middleware.jwtMiddleware(),
            middleware.oplogMiddleware(),
            controller.logout
        ).mount(
            { name: '查询管理员用户列表', path: '/api/v1/user-info/list' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            controller.list
        ).mount(
            { name: '创建管理员用户', path: '/api/v1/user-info/create' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.create,
        ).mount(
            { name: '更新管理员用户', path: '/api/v1/user-info/update' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.update,
        ).mount(
            { name: '删除管理员用户', path: '/api/v1/user-info/delete' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.del,
        );
    }

    // 创建
    async create () {
        const { ctx, service, app } = this;
        try {
            let objParams = await ctx.validateBody({
                nickname: [ 'nonempty' ],
                password: [ 'nonempty' ],
                avatar: [ 'nonempty' ],
                phone: [ 'nonempty' ],
                email: [ 'nonempty' ],
                group: [ 'nonempty' ],
            });
            await service.userInfoService.create(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 删除
    async del () {
        const { ctx, service, app } = this;
        try {
            let {
                id,
            } = await ctx.validateBody({
                id: [ 'nonempty' ],
            });
            await service.userInfoService.del(id);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 编辑
    async update () {
        const { ctx, service, app } = this;
        try {
            let objParams = await ctx.validateBody({
                id: [ 'nonempty' ],
                nickname: [ 'nonempty' ],
                password: [ 'nonempty' ],
                avatar: [ 'nonempty' ],
                phone: [ 'nonempty' ],
                email: [ 'nonempty' ],
                group: [ 'nonempty' ],
            });
            await service.userInfoService.update(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 授权登录
    async login () {
        const { ctx, service, app } = this;
        try {
            let {
                account,
                password,
            } = await ctx.validateBody({
                account: [ 'nonempty' ],
                password: [ 'nonempty' ],
            });
            let objUser = await service.userInfoService.auth({ account, password });
            objUser = await service.userInfoService.token(objUser);
            if (objUser.group.is_root_group) {
                objUser.group.menu_routes = await service.menuRouteService.list({});
            }
            ctx.respSuccess(objUser);
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 用户安全退出
    async logout () {
        const { ctx, service, app } = this;
        try {
            await service.userInfoService.logout();
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 用户列表
    async list () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                numIndex: [],
                numSize: [],
                email: [],
                group: [],
                nickname: [],
                phone: [],
            });
            const data = await service.userInfoService.list(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }

};
