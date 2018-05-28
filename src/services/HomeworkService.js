import HttpService from './HttpService';

export default class HomeworkService {

    static baseUrl() {
        return HttpService.apiURL() + "/homework/";
    }


    static getHomeworkOfClass(classId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${HomeworkService.baseUrl()}` + classId, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }

    static addNewHomework(homeworkToAdd){

        return new Promise((resolve, reject) => {
            HttpService.post(`${HomeworkService.baseUrl()}`, homeworkToAdd,
                function(data) {
                    resolve(data);
                }, function(textStatus) {
                    reject(textStatus);
                });
        });

    }


}