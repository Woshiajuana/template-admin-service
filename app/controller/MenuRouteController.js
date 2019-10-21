
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: '查询菜单路由列表', path: '/api/v1/menu-route/list' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            controller.list
        ).mount(
            { name: '创建菜单路由', path: '/api/v1/menu-route/create' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.create,
        ).mount(
            { name: '更新菜单路由', path: '/api/v1/menu-route/update' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.update,
        ).mount(
            { name: '删除菜单路由', path: '/api/v1/menu-route/delete' },
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
                title: [ 'nonempty' ],
                path: [ 'nonempty' ],
                sort: [ 'nonempty' ],
                component: [ 'nonempty' ],
                redirect: [ ],
                icon: [ ],
                params: [ ],
                father: [ ],
            });
            await service.menuRouteService.create(objParams);
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
            await service.menuRouteService.del(id);
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
                title: [ 'nonempty' ],
                path: [ 'nonempty' ],
                sort: [ 'nonempty' ],
                component: [ 'nonempty' ],
                redirect: [ ],
                icon: [ ],
                params: [ ],
                father: [ ],
            });
            await service.menuRouteService.update(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 列表
    async list () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                numIndex: [ ],
                numSize: [ ],
                name: [ ],
                path: [ ],
                method: [ ],
            });
            const data = await service.menuRouteService.list(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }
};
