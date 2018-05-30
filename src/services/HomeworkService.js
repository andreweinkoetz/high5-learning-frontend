import HttpService from './HttpService';

export default class HomeworkService {

    static baseUrl() {
        return HttpService.apiURL() + "/homework/";
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