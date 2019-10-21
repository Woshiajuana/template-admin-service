
'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const postSchema = new Schema({

        // 名称
        nickname: {
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 20,
            unique: true,
        },

        // 密码
        password: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },

        // 头像
        avatar: {
            type: String,
            trim: true,
            default: '',
        },

        // 手机
        phone: {
            type: String,
            trim: true,
            maxlength: 13,
            unique: true,
            require: true,
        },

        // 邮箱
        email: {
            type: String,
            trim: true,
            unique: true,
            maxlength: 30,
            require: true,
        },

        // 用户组
        group: {
            type: Schema.Types.ObjectId,
            ref: 'user_group',
            require: true,
        },

        // 是否是 root账号
        is_root: {
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
    return mongoose.model('user_info', postSchema);
};

module.exports.populate = [
    {
        path: 'group',
        select: 'name menu_routes api_routes is_root_group created_at updated_at',
        populate: [
            {
                path: 'api_routes',
            },
            {
                path: 'menu_routes',
            }
        ],
    },
];

module.exports.select = 'nickname avatar phone email group is_root created_at updated_at';

module.exports.listSelect = 'nickname avatar phone email is_root created_at updated_at';
