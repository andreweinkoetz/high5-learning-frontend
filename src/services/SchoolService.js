import HttpService from './HttpService';

export default class SchoolService {

    static baseUrl() {
        return HttpService.apiURL() + "/school/";
    }


    static getSchoolOfUser(userid){
        return new Promise((resolve, reject) => {
            HttpService.get(`${SchoolService.baseUrl()}`+userid,
                function(data) {
                    resolve(data);
                }, function(error) {
                    reject(error);
                });
        });

    }


    static getAllSchools(){
        return new Promise((resolve, reject) => {
            HttpService.get(`${SchoolService.baseUrl()}`,
                function(data) {
                    resolve(data);
                }, function(error) {
                    reject(error);
                });
        });

    }


    static getStudentsOfSchool(){

        return new Promise((resolve, reject) => {
            HttpService.get(`${SchoolService.baseUrl()}students/`,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

}