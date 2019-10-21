
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: '查询API路由列表', path: '/api/v1/api-route/list' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            controller.list
        ).mount(
            { name: '初始化路由列表', path: '/api/v1/api-route/init' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.init
        ).mount(
            { name: '创建API路由', path: '/api/v1/api-route/create' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.create,
        ).mount(
            { name: '更新API路由', path: '/api/v1/api-route/update' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.update,
        ).mount(
            { name: '删除API路由', path: '/api/v1/api-route/delete' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.del,
        );
    }

    /**
     * @apiVersion 1.0.0
     * @api {post} /api/v1/api-route/init api 初始化
     * @apiDescription 初始化 API-ROUTE
     * @apiGroup APP基础
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/api-route/init
     */
    async init () {
        const { ctx, service, app } = this;
        try {
            await service.apiRouteService.init();
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/api-route/create 创建API路由
     * @apiDescription 创建API路由
     * @apiGroup APP基础
     * @apiParam  {String} [name] 名称
     * @apiParam  {String} [path] 请求路径
     * @apiParam  {String} [method] 请求方法
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/api-route/create
     */
    async create () {
        const { ctx, service, app } = this;
        try {
            let objParams = await ctx.validateBody({
                name: [ 'nonempty' ],
                path: [ 'nonempty' ],
                method: [ 'nonempty' ],
            });
            await service.apiRouteService.create(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/api-route/delete 删除API路由
     * @apiDescription 删除API路由
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/api-route/delete
     */
    async del () {
        const { ctx, service, app } = this;
        try {
            let {
                id,
            } = await ctx.validateBody({
                id: [ 'nonempty' ],
            });
            await service.apiRouteService.del(id);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/api-route/update 更新API路由
     * @apiDescription 更新API路由
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiParam  {String} [name] 名称
     * @apiParam  {String} [path] 请求路径
     * @apiParam  {String} [method] 请求方法
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/api-route/update
     */
    async update () {
        const { ctx, service, app } = this;
        try {
            let objParams = await ctx.validateBody({
                id: [ 'nonempty' ],
                name: [ 'nonempty' ],
                path: [ 'nonempty' ],
                method: [ 'nonempty' ],
            });
            await service.apiRouteService.update(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/api-route/list 查询API路由列表
     * @apiDescription 查询API路由列表
     * @apiGroup APP基础
     * @apiParam  {String} [numIndex] 页数
     * @apiParam  {String} [numSize] 大小
     * @apiParam  {String} [name] 名称
     * @apiParam  {String} [path] 请求路径
     * @apiParam  {String} [method] 请求方法
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/api-route/list
     */
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
            const data = await service.apiRouteService.list(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }
};
