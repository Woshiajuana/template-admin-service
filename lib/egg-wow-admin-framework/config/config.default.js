/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {

    const config = exports = {};

    // add cors
    config.cors = {
        origin: '*', // 访问白名单,根据你自己的需要进行设置
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    // add security
    config.security = {
        csrf: {
            enable: false,
        },
    };

    // add validate
    config.validate = {
        client: {
            regular: {},
        },
    };

    // add response
    config.response = {
        codes: {
            F00001: 'APP未设置，请先设置',
            F40000: 'TOKEN未设置',
            F40001: 'TOKEN无效，请重新登录',
            F40002: 'TOKEN已过期，请重新登录',
            F40003: '无权限访问，请联系管理员',
        },
    };

    // add curl
    config.curl = {};

    return config;
};
