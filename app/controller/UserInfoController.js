'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    // 创建
    async create () {
        const { ctx, service, app } = this;
        try {
            let objParams = await ctx.validateBody({
                nickname: [ 'nonempty' ],
                password: [ 'nonempty' ],
                avatar: [ 'nonempty' ],
                phone: [ 'nonempty' ],
                email: [ 'nonempty' ],
                group: [ 'nonempty' ],
            });
            await service.userInfoService.create(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 删除
    async del () {
        const { ctx, service, app } = this;
        try {
            let {
                id,
            } = await ctx.validateBody({
                id: [ 'nonempty' ],
            });
            await service.userInfoService.del(id);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 编辑
    async update () {
        const { ctx, service, app } = this;
        try {
            let objParams = await ctx.validateBody({
                id: [ 'nonempty' ],
                nickname: [ 'nonempty' ],
                password: [ 'nonempty' ],
                avatar: [ 'nonempty' ],
                phone: [ 'nonempty' ],
                email: [ 'nonempty' ],
                group: [ 'nonempty' ],
            });
            await service.userInfoService.update(objParams);
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 授权登录
    async login () {
        const { ctx, service, app } = this;
        try {
            let {
                account,
                password,
            } = await ctx.validateBody({
                account: [ 'nonempty' ],
                password: [ 'nonempty' ],
            });
            let objUser = await service.userInfoService.auth({ account, password });
            objUser = await service.userInfoService.token(objUser);
            if (objUser.group.is_root_group) {
                objUser.group.menu_routes = await service.menuRouteService.list({});
            }
            ctx.respSuccess(objUser);
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 用户安全退出
    async logout () {
        const { ctx, service, app } = this;
        try {
            await service.userInfoService.logout();
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    // 用户列表
    async list () {
        const { ctx, service, app } = this;
        try {
            const objParams = await ctx.validateBody({
                numIndex: [],
                numSize: [],
                email: [],
                group: [],
                nickname: [],
                phone: [],
            });
            const data = await service.userInfoService.list(objParams);
            ctx.respSuccess(data);
        } catch (err) {
            ctx.respError(err);
        }
    }

};
