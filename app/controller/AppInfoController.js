
'use strict';

const { Controller } = require('egg');

module.exports = class HandleController extends Controller {

    static route (app, middleware, controller) {
        app.router.mount(
            { name: '查询应用基础信息', path: '/api/v1/app/info', usePush: false },
            controller.info
        ).mount(
            { name: '初始化应用信息', path: '/api/v1/app/init', usePush: false },
            controller.init
        );
    }

    /**
     * @apiVersion 1.0.0
     * @api {post} /api/v1/app/info api 查询应用基础信息
     * @apiDescription 查询应用基础信息
     * @apiGroup APP基础
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/app/info
     */
    async info () {
        const { ctx, service, app } = this;
        try {
            const objApp = await service.appInfoService.find();
            ctx.respSuccess(objApp);
        } catch (e) {
            ctx.respError(e);
        }
    }

    /**
     * @apiVersion 1.0.0
     * @api {post} /api/v1/app/init api 初始化应用信息
     * @apiDescription 初始化应用信息
     * @apiGroup APP基础
     * @apiParam  {String} [name] 管理台名称
     * @apiParam  {String} [logo] 管理台LOGO
     * @apiParam  {String} [theme] 主题
     * @apiParam  {String} [ownership] 所有权
     * @apiParam  {String} [nickname] 超级管理员名称
     * @apiParam  {String} [password] 超级管理员密码
     * @apiParam  {String} [avatar] 超级管理员头像
     * @apiParam  {String} [phone] 超级管理员手机号
     * @apiParam  {String} [email] 超级管理员邮箱
     * @apiSuccess (成功) {Object} data
     * @apiSampleRequest /api/v1/app/init
     */
    async init () {
        const { ctx, service, app } = this;
        try {
            let {
                name,
                logo,
                theme,
                ownership,
                nickname,
                password,
                avatar,
                phone,
                email,
            } = await ctx.validateBody({
                name: [ 'nonempty' ],
                logo: [ 'nonempty' ],
                theme: [ 'nonempty' ],
                ownership: [ 'nonempty' ],
                nickname: [ 'nonempty' ],
                password: [ 'nonempty' ],
                avatar: [ 'nonempty' ],
                phone: [ 'nonempty' ],
                email: [ 'nonempty' ],
            });
            // 判断 APP 是否已初始化
            await service.appInfoService.count();
            // 初始化 APP
            await service.appInfoService.init({
                name,
                logo,
                theme,
                ownership,
            });
            // 初始化超级管理员用户组
            const objAdminGroup = await service.userGroupService.create({
                name: '超级管理组',
                is_root_group: true,
            });
            // 初始化超级管理员用户
            await service.userInfoService.create({
                nickname,
                password,
                avatar,
                phone,
                email,
                is_root: true,
                group: objAdminGroup._id,
            });
            // 初始化菜单
            await service.menuRouteService.init();
            // 初始化 API
            await service.apiRouteService.init();
            ctx.respSuccess();
        } catch (e) {
            ctx.respError(e);
        }
    }

};
