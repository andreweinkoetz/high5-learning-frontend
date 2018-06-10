import HttpService from './HttpService';
import ClassService from "./ClassService";

export default class HomeworkService {

    static baseUrl() {
        return HttpService.apiURL() + "/homework/";
    }

    static getHomeworkDetail(homeworkId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${HomeworkService.baseUrl()}` + homeworkId,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });
    }

    static addNewHomework(classId, homeworkToAdd){

        return new Promise((resolve, reject) => {
            HttpService.post(`${HomeworkService.baseUrl()}` + classId, homeworkToAdd,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

    static updateHomework(homeworkId, homeworkToUpdate){

        return new Promise((resolve, reject) => {
            HttpService.put(`${HomeworkService.baseUrl()}` + homeworkId, homeworkToUpdate,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

    static deleteHomework(homeworkId){

        return new Promise((resolve, reject) => {
            HttpService.delete(`${HomeworkService.baseUrl()}` + homeworkId,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }

    static changeVisibilityStatus(homeworkId, desiredVisibilityStatus) {

        return new Promise((resolve, reject) => {
            HttpService.put(`${HomeworkService.baseUrl()}visibility/` + homeworkId, {desiredVisibilityStatus},
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }


}