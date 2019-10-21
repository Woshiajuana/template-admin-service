
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.mount(
            { name: 'DEMO 分发路由', path: '/api/demo/*' },
            controller.transform,
        );
    }

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
