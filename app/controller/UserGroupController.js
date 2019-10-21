
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: '查询管理员用户组列表', path: '/api/v1/user-group/list' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            controller.list
        ).mount(
            { name: '创建管理员用户组', path: '/api/v1/user-group/create' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.create,
        ).mount(
            { name: '更新管理员用户组', path: '/api/v1/user-group/update' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.update,
        ).mount(
            { name: '删除管理员用户组', path: '/api/v1/user-group/delete' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.del,
        );
    }

    async create () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                name: [ 'nonempty' ],
                remark: [ 'nonempty' ],
                api_routes: [ ],
                menu_routes: [ ],
            });
            const data = await service.userGroupService.create(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }

    async list () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                numIndex: [],
                numSize: [],
                name: [],
            });
            const data = await service.userGroupService.list(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }

    async del () {
        const { ctx, service, app } = this;
        try {
            const {
                id,
            } = await ctx.validateBody({
                id: [ 'nonempty' ],
            });
            await service.userGroupService.del(id);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    async update () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                id: [ 'nonempty' ],
                name: [ 'nonempty' ],
                remark: [ 'nonempty' ],
                api_routes: [ ],
                menu_routes: [ ],
            });
            await service.userGroupService.update(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

};
