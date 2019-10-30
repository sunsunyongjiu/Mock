/* eslint-disable no-console */
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
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
app.get('/', (req, res) => {
    res.send('<div style="color:red">hello world1</div>')
})
app.get('/test', (req, res) => {
    res.send('<div style="color:red">hello world1</div>')
})
//创建get接口
app.get('/api/', function (req, res) {
    res.send('<div style="color:red">hello world2</div>')

});
app.post('/save', urlencodedParser, (req, res) => {
    let data = req.body
    console.log(req.body); //获取请求参数
    if (data.method === 'POST') {
        app.post(data.url, urlencodedParser, (reqq, res) => {
            res.json(data.code)
        })
    }
    res.json('hello word')
})