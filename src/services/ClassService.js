import HttpService from './HttpService';
import HomeworkService from "./HomeworkService";

export default class ClassService {

    static baseUrl() {
        return HttpService.apiURL() + "/classes/";
    }


    static getClassesOfUser(){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}`,
                function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }

    static getClassDetail(classId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}/details/` + classId,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });
    }


    static getHomeworkOfClass(classId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}` + classId, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }

    static addNewClass(classToAdd){

        return new Promise((resolve, reject) => {
            HttpService.post(`${ClassService.baseUrl()}`, classToAdd,
                function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }


}