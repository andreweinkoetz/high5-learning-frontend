import HttpService from './HttpService';

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


}