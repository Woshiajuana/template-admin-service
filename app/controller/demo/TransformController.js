
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: 'DEMO 分发路由', path: '/api/demo/*' },
            controller.transform,
        );
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/demo/* DEMO 分发路由
     * @apiDescription DEMO 分发路由
     * @apiGroup APP基础
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/demo/*
     */
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
