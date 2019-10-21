
'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const postSchema = new Schema({

        // 名称
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            minlength: 2,
            maxlength: 20,
        },

        // 路径
        path: {
            type: String,
            trim: true,
            required: true,
        },

        // 请求方式
        method: {
            type: String,
            trim: true,
            default: 'POST',
        },

        // 来源
        source: {
            type: String,
            default: 'CREATE',
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
    return mongoose.model('api_route', postSchema);
};
