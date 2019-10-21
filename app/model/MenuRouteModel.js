
'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const postSchema = new Schema({

        // 菜单名称
        title: {
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

        // 重定向
        redirect: {
            type: String,
            trim: true,
            default: '',
        },

        // 参数
        params: {
            type: String,
            trim: true,
            default: '',
        },

        // 父路由
        father: {
            type: Schema.Types.ObjectId,
            ref: 'menu_route',
            default: null,
        },

        // 排序
        sort: {
            type: Number,
            trim: true,
            require: true,
        },

        // 组件
        component: {
            type: String,
            trim: true,
            required: true,
        },

        // icon
        icon: {
            type: String,
            trim: true,
            default: '',
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
    return mongoose.model('menu_route', postSchema);
};
