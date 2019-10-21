
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    // 删除
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

    // 列表
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
