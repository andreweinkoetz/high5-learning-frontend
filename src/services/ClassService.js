import HttpService from './HttpService';

export default class ClassService {

    static baseUrl() {
        return HttpService.apiURL() + "/classes/";
    }


    static getClassesOfUser(){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}`,
                function(data) {
                resolve(data);
            }, function(error) {
                reject(error);
            });
        });

    }

    static getClassDetail(classId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}/details/` + classId,
                function(data) {
                    resolve(data);
                }, function(error) {
                    reject(error);
                });
        });
    }


    static getHomeworkOfClass(classId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}` + classId, function(data) {
                resolve(data);
            }, function(error) {
                reject(error);
            });
        });

    }

    static addNewClass(classToAdd){

        return new Promise((resolve, reject) => {
            HttpService.post(`${ClassService.baseUrl()}`, classToAdd,
                function(data) {
                resolve(data);
            }, function(error) {
                reject(error);
            });
        });

    }


}