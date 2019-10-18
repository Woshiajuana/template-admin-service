
'use strict';

const { CurlService } = require('egg');

module.exports = class TransFormService extends CurlService {

    constructor (ctx) {
        super(ctx);
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

};
