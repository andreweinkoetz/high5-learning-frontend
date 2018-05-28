import HttpService from "./HttpService";

export default class UserService {

    static baseURL() {return HttpService.apiURL() + "/auth"; }

    // if user is teacher, pass license to backend
    static register(user, pass, type, license) {
        let userModel = {
            username: user,
            password: pass,
            type: type
        };
        console.log(userModel);
        console.log(license);
        if(type === 'Teacher'){
            userModel['license'] = license;
        }
        console.log(userModel);
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, userModel, function(data) {
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
        let type = JSON.parse(window.atob(base64)).type;

        return type === 'Teacher';
    }
}