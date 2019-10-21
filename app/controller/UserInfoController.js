'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: '用户安全登录', path: '/api/v1/user-info/login' },
            middleware.oplogMiddleware(),
            controller.login
        ).mount(
            { name: '用户安全退出', path: '/api/v1/user-info/logout' },
            middleware.jwtMiddleware(),
            middleware.oplogMiddleware(),
            controller.logout
        ).mount(
            { name: '查询管理员用户列表', path: '/api/v1/user-info/list' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            controller.list
        ).mount(
            { name: '创建管理员用户', path: '/api/v1/user-info/create' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.create,
        ).mount(
            { name: '更新管理员用户', path: '/api/v1/user-info/update' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.update,
        ).mount(
            { name: '删除管理员用户', path: '/api/v1/user-info/delete' },
            middleware.jwtMiddleware(),
            middleware.authMiddleware(),
            middleware.oplogMiddleware(),
            controller.del,
        );
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-info/create 创建管理员用户
     * @apiDescription 创建管理员用户
     * @apiGroup APP基础
     * @apiParam  {String} [nickname] 昵称
     * @apiParam  {String} [password] 密码
     * @apiParam  {String} [avatar] 头像
     * @apiParam  {String} [phone] 手机号
     * @apiParam  {String} [email] 邮箱
     * @apiParam  {String} [group] 用户组 id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-info/create
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-info/delete 删除管理员用户
     * @apiDescription 删除管理员用户
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-info/delete
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-info/update 编辑管理员用户
     * @apiDescription 编辑管理员用户
     * @apiGroup APP基础
     * @apiParam  {String} [id] id
     * @apiParam  {String} [nickname] 昵称
     * @apiParam  {String} [password] 密码
     * @apiParam  {String} [avatar] 头像
     * @apiParam  {String} [phone] 手机号
     * @apiParam  {String} [email] 邮箱
     * @apiParam  {String} [group] 用户组 id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-info/update
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-info/login 用户安全登录
     * @apiDescription 用户安全登录
     * @apiGroup APP基础
     * @apiParam  {String} [account] 账号
     * @apiParam  {String} [password] 密码
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-info/login
     */
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

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-info/logout 用户安全退出
     * @apiDescription 用户安全退出
     * @apiGroup APP基础
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-info/logout
     */
    async logout () {
        const { ctx, service, app } = this;
        try {
            await service.userInfoService.logout();
            ctx.respSuccess();
        } catch (err) {
            ctx.respError(err);
        }
    }

    /**
     * @apiVersion 1.0.0
     * @api {get} /api/v1/user-info/list 查询管理员用户列表
     * @apiDescription 查询管理员用户列表
     * @apiGroup APP基础
     * @apiParam  {String} [numIndex] 页数
     * @apiParam  {String} [numSize] 大小
     * @apiParam  {String} [nickname] 昵称
     * @apiParam  {String} [phone] 手机号
     * @apiParam  {String} [email] 邮箱
     * @apiParam  {String} [group] 用户组 id
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/user-info/list
     */
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
