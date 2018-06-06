import HttpService from './HttpService';

export default class SchoolService {

    static baseUrl() {
        return HttpService.apiURL() + "/school/";
    }


    static getSchoolOfUser(){
        return new Promise((resolve, reject) => {
            HttpService.get(`${SchoolService.baseUrl()}`,
                function(data) {
                    resolve(data);
                }, function(error) {
                    reject(error);
                });
        });

    }


    static getStudentsOfSchool(schoolId){

        return new Promise((resolve, reject) => {
            HttpService.get(`${SchoolService.baseUrl()}students/` + schoolId,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

}