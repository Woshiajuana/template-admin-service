
'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const postSchema = new Schema({

        // 名称
        name: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 20,
            default: '管理台',
        },

        // logo
        logo: {
            type: String,
            trim: true,
            required: true,
        },

        // 主题
        theme: {
            type: String,
            trim: true,
            default: 'DEFAULT',
        },

        // 所有权
        ownership: {
            type: String,
            trim: true,
            maxlength: 100,
            required: true,
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
    return mongoose.model('app_info', postSchema);
};
