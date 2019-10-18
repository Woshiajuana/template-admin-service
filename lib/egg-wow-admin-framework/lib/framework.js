'use strict';

const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');

class Application extends egg.Application {
    get [EGG_PATH]() {
        return path.dirname(__dirname);
    }
}

class Agent extends egg.Agent {
    get [EGG_PATH]() {
        return path.dirname(__dirname);
    }
}

class CurlService extends egg.Service {

    constructor(ctx, name) {
        super(ctx, name);
        const strName = name || this.constructor.name;
        this.options = Object.assign({}, ctx.app.config.curl[strName] || {});
    }

    async afterRequest (response) {
        let {
            status,
            statusMessage,
            data,
        } = response;
        const strErrMsg = data.msg || data.message || statusMessage;
        if (status >= 300 || status < 200 || data.code !== 'S00000')
            throw `[${status}]：${strErrMsg}`;
        return response.data ? response.data.data : response;
    }

    async beforeRequest (options) {
        return options;
    }

    async curl (url, options) {
        let {
            baseUrl,
        } = options = Object.assign({
            method: 'POST',
            dataType: 'json',
        }, this.options, options);
        url = `${baseUrl}${url}`;
        options = await this.beforeRequest(options);
        let response = await this.ctx.curl(url, options);
        response = await this.afterRequest(response);
        return response;
    }
}

module.exports = Object.assign(egg, {
    Application,
    Agent,
    CurlService,
});
