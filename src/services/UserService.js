import HttpService from "./HttpService";

export default class UserService {

    /**
     * base url for the auth rest api
     * @returns {string}
     */
    static baseURL() {
        return HttpService.apiURL() + "/auth";
    }

    /**
     * register a new user (teacher or student)
     * if user is teacher, pass license to backend
     * @param user
     * @param pass
     * @param type
     * @param school
     * @param license
     * @returns {Promise<any>}
     */
    static register(user, pass, type, school, license) {
        let userModel = {
            username: user,
            password: pass,
            type: type,
            schoolname: school
        };
        if (type === 'Teacher') {
            userModel['license'] = license;
        }

        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/register`, userModel, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    /**
     * login a user (teacher or student)
     * @param user
     * @param pass
     * @returns {Promise<any>}
     */
    static login(user, pass) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${UserService.baseURL()}/login`, {
                username: user,
                password: pass
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    /**
     * update the password for the current user
     * @param pass
     * @returns {Promise<any>}
     */
    static changePassword(pass) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${UserService.baseURL()}/changepw`, {
                password: pass
            }, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        });
    }

    /**
     * log out the current user
     */
    static logout() {
        window.localStorage.removeItem('jwtToken');
    }

    /**
     * transform the auth token (jwtToken) to json in order to get current user data
     * @returns {*}
     */
    static getCurrentUser() {
        let token = window.localStorage['jwtToken'];
        if (!token) return {};

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return {
            id: JSON.parse(window.atob(base64)).id,
            username: JSON.parse(window.atob(base64)).username,
            type: JSON.parse(window.atob(base64)).type,
            schoolname: JSON.parse(window.atob(base64)).schoolname
        };
    }

    /**
     * check if the current user is logged in
     * @returns {boolean}
     */
    static isAuthenticated() {
        return !!window.localStorage['jwtToken'];
    }

    /**
     * check if the current user is a teacher (type === teacher)
     * @returns {boolean}
     */
    static isTeacher() {
        let token = window.localStorage['jwtToken'];
        if (!token) return false;

        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        let type = JSON.parse(window.atob(base64)).type;

        return type === 'Teacher';
    }
}