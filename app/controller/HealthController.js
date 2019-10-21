
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

    // 检测服务是否正常
    async health () {
        this.ctx.respSuccess('I am very healthy');
    }

};
