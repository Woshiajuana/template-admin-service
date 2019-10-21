
'use strict';

const { Service } = require('egg');


module.exports = class HandleServer extends Service {

    // 初始化菜单
    async init () {
        const { ctx, app } = this;
        const { _id: userId } = await this.create({
            "redirect" : "admin/user",
            "params" : "",
            "father" : null,
            "icon" : "manage-user",
            "title" : "管理员用户管理",
            "path" : "admin",
            "sort" : 1,
            "component" : "layout",
            "source": "INIT",
        });
        const { _id: logId } = await this.create({
            "redirect" : "oplog/index",
            "params" : "",
            "father" : null,
            "icon" : "bug",
            "title" : "操作日志管理",
            "path" : "oplog",
            "sort" : 2,
            "component" : "layout",
            "source": "INIT",
        });
        const menuRoutes = [
            {
                "redirect" : "",
                "params" : "",
                "father" : userId,
                "icon" : "",
                "title" : "API列表",
                "path" : "api",
                "sort" : 1,
                "component" : "admin/api",
                "source": "INIT",
            },
            {
                "redirect" : "",
                "params" : "",
                "father" : userId,
                "icon" : "",
                "title" : "菜单列表",
                "path" : "menu",
                "sort" : 2,
                "component" : "admin/menu",
                "source": "INIT",
            },
            {
                "redirect" : "",
                "params" : "",
                "father" : userId,
                "icon" : "",
                "title" : "用户组列表",
                "path" : "group",
                "sort" : 3,
                "component" : "admin/group",
                "source": "INIT",
            },
            {
                "redirect" : "",
                "params" : "",
                "father" : userId,
                "icon" : "",
                "title" : "管理员列表",
                "path" : "user",
                "sort" : 4,
                "component" : "admin/user",
                "source": "INIT",
            },
            {
                "redirect" : "",
                "params" : "",
                "father" : logId,
                "icon" : "",
                "title" : "操作日志列表",
                "path" : "index",
                "sort" : 1,
                "component" : "oplog/index",
                "source": "INIT",
            },
        ];
        await ctx.model.MenuRouteModel.insertMany(menuRoutes, { ordered: false });
    }

    // 创建
    async create (data) {
        const { ctx } = this;
        return await ctx.model.MenuRouteModel.create(data);
    }

    // 根据 id 查询
    async findById (id) {
        const { ctx } = this;
        return await ctx.model.MenuRouteModel
            .findById(id)
            .lean();
    }

    // 列表
    async list ({ numIndex, numSize, name, path, method }) {
        const { ctx } = this;
        if (numIndex && numSize) {
            let filter = { $or: [] }; // 多字段匹配
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
            const numTotal = await ctx.model.MenuRouteModel.count(filter);
            const arrData = await ctx.model.MenuRouteModel
                .find(filter)
                .sort('-sort')
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
            const arrData = await ctx.model.MenuRouteModel
                .find().sort('-sort').lean();
            return arrData;
        }
    }

    // 删除
    async del (id) {
        const { ctx, app } = this;
        const { source } = await this.findById(id);
        if (source === 'INIT') throw '不能删除该项';
        await ctx.model.MenuRouteModel.remove({ _id: app.mongoose.Types.ObjectId(id) });
    }

    // 更新
    async update (data) {
        const { ctx, app } = this;
        const { id } = data;
        const { source } = await this.findById(id);
        if (source === 'INIT') throw '不能编辑该项';
        delete data.id;
        await ctx.model.MenuRouteModel.update({ _id: app.mongoose.Types.ObjectId(id) }, data);
    }
};
