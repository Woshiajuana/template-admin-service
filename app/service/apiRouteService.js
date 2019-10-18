
'use strict';

const { Service } = require('egg');


module.exports = class HandleServer extends Service {

    // 初始化
    async init () {
        const { ctx } = this;
        const { apiRoutes } = require('./../router');
        apiRoutes.forEach((item) => { item.source = 'INIT' });
        await ctx.model.ApiRouteModel.insertMany(apiRoutes, { ordered: false });
    }

    // 创建
    async create (data) {
        const { ctx } = this;
        await ctx.model.ApiRouteModel.create(data);
    }

    // 根据 id 查询
    async findById (id) {
        const { ctx } = this;
        return await ctx.model.ApiRouteModel
            .findById(id)
            .lean();
    }

    // 查询
    async findOne (data) {
        const { ctx } = this;
        return await ctx.model.ApiRouteModel.findOne(data).lean();
    }

    // 列表
    async list ({ numIndex, numSize, name, path, method }) {
        const { ctx } = this;
        if (numIndex && numSize) {
            let filter = { $or: [] }; // 多字段同事匹配
            if (name) {
                filter.$or.push({ name: { $regex: name, $options: '$i' } });
            }
            if (path) {
                filter.$or.push({ path: { $regex: path, $options: '$i' } });
            }
            if (method) {
                filter.$or.push({ method: { $regex: method, $options: '$i' } });
            }
            if (!filter.$or.length) delete filter.$or;
            const numTotal = await ctx.model.ApiRouteModel.count(filter);
            const arrData = await ctx.model.ApiRouteModel
                .find(filter)
                .sort('-created_at')
                .skip((numIndex - 1) * numSize)
                .limit(numSize)
                .lean();
            return {
                arrData,
                numTotal,
                numIndex,
                numSize,
            }
        } else {
            const arrData = await ctx.model.ApiRouteModel
                .find().sort('-created_at').lean();
            return arrData;
        }
    }

    // 删除
    async del (id) {
        const { ctx, app } = this;
        const { source } = await this.findById(id);
        if (source === 'INIT') throw '不能删除该项';
        await ctx.model.ApiRouteModel.remove({ _id: app.mongoose.Types.ObjectId(id) });
    }

    // 更新
    async update (data) {
        const { ctx, app } = this;
        const { id } = data;
        const { source } = await this.findById(id);
        if (source === 'INIT') throw '不能编辑该项';
        delete data.id;
        await ctx.model.ApiRouteModel.update({ _id: app.mongoose.Types.ObjectId(id) }, data);
    }
};
