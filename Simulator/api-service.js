const fetch = require('node-fetch')

class ApiService {
    static async get(url) {
        const response = await fetch(url, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        })
        return response.json()
    }

    static async post(url, data) {
        // console.log("api-service/post")
        // console.log("url is: ", url)
        // console.log("data is: ", data)
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        return response.json()
    }

    static async delete(url) {
        const response = await fetch(url, {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' }
        })
        return response.json()
    }
}

module.exports = ApiService

