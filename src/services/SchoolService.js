import HttpService from './HttpService';

export default class SchoolService {

    /**
     * base url of the school rest api
     * @returns {string}
     */
    static baseUrl() {
        return HttpService.apiURL() + "/school/";
    }

    /**
     * get all schools
     * @returns {Promise<any>}
     */
    static getAllSchools() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SchoolService.baseUrl()}`,
                function (data) {
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
        });

    }

    /**
     * get all students of the school
     * @returns {Promise<any>}
     */
    static getStudentsOfSchool() {

        return new Promise((resolve, reject) => {
            HttpService.get(`${SchoolService.baseUrl()}students/`,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }
}