/* eslint-disable no-console */
const express = require('express');
const app = express();
// 操作json文件
var fs = require('fs');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//将保存的数据书写到json文件中
function writeJson(params) {
    //现将json文件读出来
    fs.readFile('./build/data.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString(); //将二进制的数据转换为字符串
        person = JSON.parse(person); //将字符串转换为json对象
        person.data.push(params); //将传来的对象push进数组对象中
        // person.total = person.data.length; //定义一下总条数，为以后的分页打基础
        // console.log(person.data);
        var str = JSON.stringify(person); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('./build/data.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            init()
            console.log('----------新增成功-------------');
        })
    })
}
//将保存的数据书写到json文件中
function editJson(params) {
    //现将json文件读出来
    fs.readFile('./build/data.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString(); //将二进制的数据转换为字符串
        person = JSON.parse(person); //将字符串转换为json对象
        person.data = params; //将传来的对象push进数组对象中
        // person.total = person.data.length; //定义一下总条数，为以后的分页打基础
        // console.log(person.data);
        var str = JSON.stringify(person); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile('./build/data.json', str, function (err) {
            if (err) {
                console.error(err);
            }
            init()
            console.log('----------编辑成功-------------');
        })
    })
}
//读取已有的json
function getJson(params) {
    //现将json文件读出来
    return new Promise((resolve, reject) => {
        fs.readFile('./build/data.json', function (err, data) {
            if (err) {
                reject(err)
                return console.error(err);
            }
            var list = data.toString(); //将二进制的数据转换为字符串
            list = JSON.parse(list); //将字符串转换为json对象
            resolve(list)
        })
    })

}

function init() {
    getJson().then(res => {
        let datas = res.data;
        datas.forEach(item => {
            if (item.method === 'POST') {
                app.post(item.url, urlencodedParser, (req, res) => {
                    res.json(item.code)
                })
            } else {
                app.get(item.url, (req, res) => {
                    res.json(item.code)
                })
            }
        })
    }).catch(rs => {
        console.log(rs)
    })
}
init()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.listen(8081, () => {})
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next()
});
app.get('/getList', (req, res) => {
    getJson().then(list => {
        res.json(list)
    })

})
//创建get接口
app.get('/api/', function (req, res) {
    res.send('<div style="color:red">hello world2</div>')

});
app.post('/save', urlencodedParser, (req, res) => {
    let data = req.body
    getJson().then(list => {
        if (list.data.filter(item => item.url === data.url).length > 0) {
            res.json({
                code: 1,
                message: '该接口已存在'
            })
        } else {
            writeJson(req.body)
            res.json({
                code: 0,
                message: '添加成功'
            })
        }
    })

})
app.post('/edit', urlencodedParser, (req, res) => {
    let data = req.body
    editJson(data)
    res.json('编辑成功')

})