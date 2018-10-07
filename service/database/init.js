const mongoose = require('mongoose')
const db = "mongodb://localhost/smile~-vue"
const glob = require('glob')
const {resolve} = require('path')

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
mongoose.Promise =  global.Promise
exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db)
    let  maxConnetcTimes = 0;
    return new Promise((resolve,reject)=>{

        //增加数据库监听事件
        mongoose.connection.on('disconnected',()=>{
            console.log("*************数据库断开")
            if(maxConnetcTimes<=3){
                maxConnetcTimes ++
                mongoose.connect(db)
            }else{
                reject()
                throw new error("数据库出现问题")
            }
        })
        //数据库出现错误的时候
        mongoose.connection.on('error',(err)=>{
            console.log("*************数据库错误")
            if(maxConnetcTimes<=3){
                maxConnetcTimes ++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new error("数据库出现问题")
            }
        })
        //链接打开的时候
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!')
             resolve()
        })
    })
    //增加数据库连接的事件监听
    }