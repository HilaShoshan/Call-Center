// BEN HILA


const fetch = require('node-fetch');

class ApiService {
    static async get(url) {
        const response = await fetch(url, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }

    static async post(url, data) {
        const response = await fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        });
        return response.json();
    }
}
module.exports = ApiService;

