
'use strict';

const { Service } = require('egg');

module.exports = class HandleServer extends Service {

    // 查询 APP 应用基本信息
    async find () {
        const { ctx } = this;
        const [ objApp ] = await ctx.model.AppInfoModel.find();
        if (!objApp) throw 'F00001';
        return objApp;
    }

    // 判断 APP 是否已初始化
    async count () {
        const { ctx } = this;
        const numCount = await ctx.model.AppInfoModel.count();
        if (numCount) throw '已初始化 APP，请刷新页面...';
        return numCount;
    }

    // 初始化 APP 应用
    async init (data) {
        const { ctx } = this;
        return await ctx.model.AppInfoModel.create(data);
    }

};
