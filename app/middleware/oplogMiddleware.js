
'use strict';

module.exports = () => {
    return async function (ctx, next) {
        await next();
        try {
            const {
                logger,
                request,
                query,
                app,
                body,
                state,
                service,
                ip = '',
                params = '',
            } = ctx;
            let {
                method,
                path,
                body: data,
            } = request;
            let {
                _id: userId,
            } = state.user || {};
            if (path === '/api/v1/user-info/login' && body && body.data) {
                userId = body.data._id;
            }
            let target = params[0] || '';
            if (target) {
                method = 'ALL';
                path = `${path.replace(target, '')}*`;
            }
            let {
                _id: apiId,
            } = await service.apiRouteService.findOne({ path, method }) || {};
            await service.oplogService.create({
                user: userId,
                api: apiId,
                result: { code: body.code, msg: body.msg },
                params: data || {},
                ip,
                target,
            });
        } catch (e) {
            console.log(e);
        }
    }
};
