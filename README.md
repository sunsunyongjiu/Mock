# Mock平台
########启动须知########

从git clone后 cd到目录下，运行npm install (因为国内网络问题，建议使用cnpm install)
npm install supervisor -g (可以实时监听nodejs变化，热部署)

运行 npm run serve 启动前端页面，npm run mock 启动模拟数据后台

每次新增的接口都会保存到build文件夹下的data.json文件中