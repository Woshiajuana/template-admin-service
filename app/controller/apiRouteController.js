
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    // 初始化
    async init () {
        const { ctx, service, app } = this;
        try {
            await service.apiRouteService.init();
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 创建
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

    // 删除
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

    // 编辑
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

    // 用户列表
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
