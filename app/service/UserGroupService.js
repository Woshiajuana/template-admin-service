
'use strict';

const { Service } = require('egg');
const { listSelect } = require('./../model/userGroupModel');

module.exports = class HandleServer extends Service {

    // 创建用户组
    async create (data) {
        const { ctx } = this;
        return await ctx.model.UserGroupModel.create(data);
    }

    // 列表
    async list ({ numIndex, numSize, name }) {
        const { ctx } = this;
        if (numIndex && numSize) {
            let filter = { $or: [] }; // 多字段同事匹配
            if (name) {
                filter.$or.push({ name: { $regex: name, $options: '$i' } });
            }
            if (!filter.$or.length) delete filter.$or;
            const numTotal = await ctx.model.UserGroupModel.count(filter);
            const arrData = await ctx.model.UserGroupModel
                .find(filter)
                .sort('-created_at')
                .skip((numIndex - 1) * numSize)
                .limit(numSize)
                .select(listSelect)
                .populate()
                .lean();
            return {
                arrData,
                numTotal,
                numIndex,
                numSize,
            }
        } else {
            const arrData = await ctx.model.UserGroupModel
                .find().sort('-created_at').select(listSelect).lean();
            return arrData;
        }
    }

    // 根据 id 来查询
    async findById (id) {
        const { ctx, app } = this;
        return await ctx.model.UserGroupModel.findById(id).lean();
    }

    // 删除
    async del (id) {
        const { ctx, app } = this;
        const { is_root_group } = await this.findById(id);
        if (is_root_group) throw '不能删除超级管理用户组';
        await ctx.model.UserGroupModel.remove({ _id: app.mongoose.Types.ObjectId(id) });
    }

    // 更新
    async update (data) {
        const { ctx, app } = this;
        const { id } = data;
        const { is_root_group } = await this.findById(id);
        if (is_root_group) throw '不能编辑超级管理用户组';
        delete data.id;
        await ctx.model.UserGroupModel.update({ _id: app.mongoose.Types.ObjectId(id) }, data);
    }

};
