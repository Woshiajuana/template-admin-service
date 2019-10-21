/* eslint valid-jsdoc: "off" */

'use strict';

module.exports = appInfo => {

    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1557904782826_8085';

    // add your middleware config here
    config.middleware = [];

    // add cors
    config.cors = {
        origin: '*', // 访问白名单,根据你自己的需要进行设置
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    // add redis
    config.redis = {
        client: {
            host: '47.95.202.71',
            port: '6379',
            db: '0',
            family: 'IPv4',
            password: 'zbDHVaWOgMdV4rPQ3wETRYfRFjlEos83',
        },
    };

    // add email
    config.email = {
        client: {
            host: 'smtp.mxhichina.com', // 主机
            secureConnection: true, // 使用 SSL
            port: 465, // SMTP 端口
            auth: {
                user: 'zhigang.chen@owulia.com',
                pass: 'liujiaoyan1120/',
            },
        },
    };

    // add mongoose
    config.mongoose = {
        // url: 'mongodb://47.95.202.71:27017/wow_admin_test',
        url: 'mongodb://47.95.202.71:27017/wow_admin',
        options: {
            // user: 'wow_admin_test',
            user: 'wow_admin',
            // pass: '123456',
            pass: 'wow_admin123',
        },
    };

    // add jwt
    exports.jwt = {
        secret: "wowadminajuan"
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
    config.curl = {
        TransFormService: {
            name: '转发 DEMO 服务器示例',
            baseUrl: 'http://127.0.0.1:7001/',
        }
    };


    return config;
};
