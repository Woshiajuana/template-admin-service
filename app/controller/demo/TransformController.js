
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    // 转发
    async transform () {
        const { ctx, service, app } = this;
        try {
            const {
                params,
                method = '',
                query = '',
                body = '',
            } = ctx;
            const strTargetUrl = params[0] || '';
            const data = await service.demo.transformService.curl(strTargetUrl,  {
                method,
                data: method === 'get' ? query : body,
            });
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }

};
