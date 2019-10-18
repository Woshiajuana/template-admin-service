
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

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
