
'use strict';

const { Controller } = require('egg');
require('egg-wow-admin-framework/index');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { path: '/api/health', method: 'GET' },
            controller.health,
        );
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/health api 检测服务是否健康
     * @apiDescription 检测服务是否健康
     * @apiGroup APP基础
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/health
     */
    async health () {
        this.ctx.respSuccess('I am very healthy');
    }

};
