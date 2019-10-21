
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: '查询操作日志列表', path: '/api/v1/oplog/list' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            controller.list
        ).mount(
            { name: '删除操作日志', path: '/api/v1/oplog/delete' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.del,
        );
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/oplog/delete 删除操作日志
     * @apiDescription 删除操作日志
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/oplog/delete
     */
    async del () {
        const { ctx, service, app } = this;
        try {
            let {
                id,
            } = await ctx.validateBody({
                id: [ 'nonempty' ],
            });
            await service.oplogService.del(id);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/oplog/list 查询操作日志列表
     * @apiDescription 查询操作日志列表
     * @apiGroup APP基础
     * @apiParam  {String} [numIndex] 页数
     * @apiParam  {String} [numSize] 大小
     * @apiParam  {String} [user] 管理员 id
     * @apiParam  {String} [path] 操作 api
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/oplog/list
     */
    async list () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                numIndex: [ ],
                numSize: [ ],
                user: [ ],
                api: [ ],
            });
            const data = await service.oplogService.list(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }
};
