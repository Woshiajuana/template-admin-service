
'use strict';

const { Service } = require('egg');
const { populate, select, listSelect } = require('./../model/userInfoModel');
const ms = require('ms');

module.exports = class HandleServer extends Service {

    // 创建管理用户
    async create (data) {
        const { ctx } = this;
        await ctx.model.UserInfoModel.create(data);
    }

    // 登录查询
    async auth ({ account, password }) {
        let objUser = await this.findOne({ nickname: account, password });
        if (!objUser)
            objUser = await this.findOne({ phone: account, password });
        if (!objUser)
            objUser = await this.findOne({ email: account, password });
        if (!objUser) throw '用户账号不存在或密码错误';
        return objUser;
    }

    // 生成 token
    async token (objUser) {
        const { ctx, app, config } = this;
        const { redis } = app;
        const numMaxAge = ms('1000000000m' || config.jwt.maxAge || '1000000000m');
        const strToken = ctx.jwt.sign(objUser);
        await redis.set(strToken, JSON.stringify(objUser), 'EX', numMaxAge * 0.001);
        objUser.access_token = strToken;
        return objUser;
    }

    // 安全退出
    async logout () {
        const { ctx, app } = this;
        const { redis } = app;
        const { accessToken } = ctx.state.user;
        await redis.del(accessToken);
    }

    // 查询用户信息
    async findOne (data) {
        const { ctx } = this;
        return await ctx.model.UserInfoModel
            .findOne(data)
            .select(select)
            .populate(populate)
            .lean();
    }

    // 根据 id 查询用户信息
    async findById (id) {
        const { ctx } = this;
        return await ctx.model.UserInfoModel
            .findById(id)
            .select(select)
            .populate(populate)
            .lean();
    }

    // 用户列表
    async list ({ numIndex, numSize, email, group, nickname, phone }) {
        const { ctx, app } = this;
        if (numIndex && numSize) {
            let filter = {
                $or: [], // 多字段同时匹配
            };
            if (email) {
                filter.$or.push({ email: { $regex: email, $options: '$i', } });
            }
            if (group) {
                group = app.mongoose.Types.ObjectId(group);
                filter.$or.push({ group: group });
            }
            if (nickname) {
                filter.$or.push({ nickname: { $regex: nickname, $options: '$i', } });
            }
            if (phone) {
                filter.$or.push({ phone: { $regex: phone, $options: '$i' } });
            }
            if (!filter.$or.length) delete filter.$or;
            const numTotal = await ctx.model.UserInfoModel.count(filter);
            const arrData = await ctx.model.UserInfoModel
                .find(filter)
                .sort('-created_at')
                .skip((numIndex - 1) * numSize)
                .limit(numSize)
                .select(select)
                .populate(populate)
                .lean();
            return {
                numTotal,
                numIndex,
                numSize,
                arrData,
            }
        } else {
            const arrData = await ctx.model.UserInfoModel
                .find().sort('-created_at').select(select).lean();
            return arrData;
        }

    }

    // 删除
    async del (id) {
        const { ctx, app } = this;
        const { is_root } = await this.findById(id);
        if (is_root) throw '不能删除 root 账号';
        await ctx.model.UserInfoModel.remove({ _id: app.mongoose.Types.ObjectId(id) });
    }

    // 更新
    async update (data) {
        const { ctx, app } = this;
        const { id } = data;
        const { is_root } = await this.findById(id);
        if (is_root) throw '不能删除 root 账号';
        delete data.id;
        await ctx.model.UserInfoModel.update({ _id: app.mongoose.Types.ObjectId(id) }, data);
    }
};
