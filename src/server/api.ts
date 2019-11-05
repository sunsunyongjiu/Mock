import http from './http'

export const api = {

    getList: function (paramObj: any) {

        return http.get('/getList', paramObj)

    },
    save: function (paramObj: any) {
        return http.post('/save', paramObj)
    },
    test: function (paramObj: any) {
        return http.post('/testnew', paramObj)
    },
    edit: function (paramObj: any) {
        return http.post('/edit', paramObj)
    },
    addModel: function (paramObj: any) {
        return http.post('/addModel', paramObj)
    },
    getModel: function (paramObj: any) {
        return http.get('/getModels', paramObj)
    },

}