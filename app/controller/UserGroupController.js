
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

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
