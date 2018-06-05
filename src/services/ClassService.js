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

    static updateClass(classToUpdate, classId){

        return new Promise((resolve, reject) => {
            HttpService.put(`${ClassService.baseUrl()}` + classId, classToUpdate,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

    static deleteClass(classId){

        return new Promise((resolve, reject) => {
            HttpService.delete(`${ClassService.baseUrl()}` + classId,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

    static getStudentsOfClass(classId){

        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}students/` + classId,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

}