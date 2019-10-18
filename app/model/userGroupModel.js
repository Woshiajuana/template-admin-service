
'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const postSchema = new Schema({

        // 名称
        name: {
            type: String,
            trim: true,
            unique: true,
            minlength: 2,
            maxlength: 20,
            default: '',
        },

        // 路由权限 or 菜单权限
        menu_routes: [{
            type: Schema.Types.ObjectId,
            ref: 'menu_route',
        }],

        // 接口权限
        api_routes: [{
            type: Schema.Types.ObjectId,
            ref: 'api_route',
        }],

        // 备注
        remark: {
            type: String,
            trim: true,
            maxlength: 100,
            default: '',
        },

        // 是否是超级管理员组
        is_root_group: {
            type: Boolean,
            default: false,
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
    return mongoose.model('user_group', postSchema);
};

module.exports.listSelect = 'name is_root_group remark menu_routes api_routes created_at updated_at';
