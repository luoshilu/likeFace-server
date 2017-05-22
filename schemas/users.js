var mongoose = require('mongoose');

//声明一个mongoons对象
var UsersSchema = new mongoose.Schema({
    mail: String,
    name: String,
    psw: String,
    headurl: String,
    imgNum: Number,// 图片数量
    about: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

// 添加 mongoose 静态方法，静态方法在Model层就能使用
UsersSchema.statics.findbytitle = function(title, callback) {
    return this.model('mongoose').find({data: title}, callback);
};
//每次执行都会调用,时间更新操作
UsersSchema.pre('save', function(next) {
    if(this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now('yyyy/mm/dd/ HH:mm:ss');
    }else {
        this.meta.updateAt = Date.now('yyyy/mm/dd/ HH:mm:ss');
    }
    next();
});

//查询的静态方法
UsersSchema.statics = {
    findbytitle: function(title, callback) {
        return this.find({first: title}, callback);
    },
    fetch: function(cb) { //查询所有数据
        return this
          .find()
          .exec(cb); //回调
    },
    findById: function(id, cb) { //根据id查询单条数据
        return this
          .findOne({_id: id})
          .exec(cb);
    },
    add: function(data ,cb) {
        return this
            .create(data, cb);
    }
}

//暴露出去的方法
module.exports = UsersSchema;