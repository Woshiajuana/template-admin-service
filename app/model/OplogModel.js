
'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const postSchema = new Schema({

        // 名称
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user_info',
            require: true,
        },

        // API
        api: {
            type: Schema.Types.ObjectId,
            ref: 'api_route',
            require: true,
        },

        // 请求参数
        params: {
            type: Object,
            require: true,
        },

        // 转发的目标地址
        target: {
            type: String,
            default: '',
        },

        // 结果
        result: {
            type: Object,
            require: true,
        },

        // 请求 ip
        ip: {
            type: String,
            default: '',
        },

        // 创建时间
        created_at: {
            type: Date,
            default: Date.now,
        },

        // 更新时间
        updated_at: {
            type: Date,
            default: Date.now,
        },

    });
    return mongoose.model('oplog', postSchema);
};

module.exports.populate = [
    {
        path: 'user',
    },
    {
        path: 'api',
    },
];
