
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/menu-route/create 创建菜单路由
     * @apiDescription 创建菜单路由
     * @apiGroup APP基础
     * @apiParam  {String} [title] 名称
     * @apiParam  {String} [path] 路由
     * @apiParam  {String} [sort] 排序
     * @apiParam  {String} [component] 组件
     * @apiParam  {String} [redirect] 重定向
     * @apiParam  {String} [icon] icon
     * @apiParam  {String} [params] 参数
     * @apiParam  {String} [father] 父菜单
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/menu-route/create
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/menu-route/delete 删除菜单路由
     * @apiDescription 删除菜单路由
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/menu-route/delete
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/menu-route/update 更新菜单路由
     * @apiDescription 更新菜单路由
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiParam  {String} [title] 名称
     * @apiParam  {String} [path] 路由
     * @apiParam  {String} [sort] 排序
     * @apiParam  {String} [component] 组件
     * @apiParam  {String} [redirect] 重定向
     * @apiParam  {String} [icon] icon
     * @apiParam  {String} [params] 参数
     * @apiParam  {String} [father] 父菜单
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/menu-route/update
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/menu-route/list 查询菜单路由列表
     * @apiDescription 查询菜单路由列表
     * @apiGroup APP基础
     * @apiParam  {String} [numIndex] 页数
     * @apiParam  {String} [numSize] 大小
     * @apiParam  {String} [title] 名称
     * @apiParam  {String} [path] 路由
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/menu-route/list
     */
    async list () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                numIndex: [ ],
                numSize: [ ],
                title: [ ],
                path: [ ],
            });
            const data = await service.menuRouteService.list(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }
};
