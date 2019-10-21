
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-group/create 创建管理员用户组
     * @apiDescription 创建管理员用户组
     * @apiGroup APP基础
     * @apiParam  {String} [name] 名称
     * @apiParam  {String} [remark] 备注
     * @apiParam  {Array} [api_routes]  API路由
     * @apiParam  {Array} [menu_routes] 菜单路由
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-group/create
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-group/list 查询管理员用户组列表
     * @apiDescription 查询管理员用户组列表
     * @apiGroup APP基础
     * @apiParam  {String} [numIndex] 页数
     * @apiParam  {String} [numSize] 大小
     * @apiParam  {String} [name] 名称
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-group/list
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-group/delete 删除管理员用户组
     * @apiDescription 删除管理员用户组
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-group/delete
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-group/update 更新管理员用户组
     * @apiDescription 更新管理员用户组
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiParam  {String} [name] 名称
     * @apiParam  {String} [remark] 备注
     * @apiParam  {Array} [api_routes]  API路由
     * @apiParam  {Array} [menu_routes] 菜单路由
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-group/update
     */
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
