import http from './http'

export const api = {

    getTest: function (paramObj: any) {

        return http.get('/test', paramObj)

    },
    save: function (paramObj: any) {
        return http.post('/save', paramObj)
    },
    test: function (paramObj: any) {
        return http.post('/testnew', paramObj)
    }

}