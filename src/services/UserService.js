import HttpService from "./HttpService";

export default class UserService {

    static baseURL() {return "http://localhost:3000/auth"; }

    // if user is teacher, pass license to backend
    static register(user, pass, type, license) {
        let json = {
            username: user,
            password: pass,
            type: type};
        if(type === 'Teacher'){
            json.push({license: license});
        }
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, json, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                username: user,
                password: pass
            }, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static logout(){
        window.localStorage.removeItem('jwtToken');
    }

    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id : JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username,
            type: JSON.parse(window.atob(base64)).type
        };
    }

    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }

    static isTeacher(){
        let token = window.localStorage['jwtToken'];
        if (!token) return false;

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        console.log(base64);
        console.log(window.atob(base64));
        console.log(JSON.parse(window.atob(base64)));
        let type = JSON.parse(window.atob(base64)).type;

        return type === 'Teacher';
    }
}