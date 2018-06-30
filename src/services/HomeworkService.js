import HttpService from './HttpService';

export default class HomeworkService {

    static baseUrl() {
        return HttpService.apiURL() + "/homework/";
    }

    // Get all information of this homework (incl. exercises etc.) from db
    static getHomeworkDetail(homeworkId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${HomeworkService.baseUrl()}` + homeworkId,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });
    }

    // Adds a new homework to the database
    static addNewHomework(classId, homeworkToAdd) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${HomeworkService.baseUrl()}` + classId, homeworkToAdd,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }

    static updateHomework(homeworkId, homeworkToUpdate) {

        return new Promise((resolve, reject) => {
            HttpService.put(`${HomeworkService.baseUrl()}` + homeworkId, homeworkToUpdate,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }

    static deleteHomework(homeworkId) {

        return new Promise((resolve, reject) => {
            HttpService.delete(`${HomeworkService.baseUrl()}` + homeworkId,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }

    static changeVisibilityStatus(homeworkId, desiredVisibilityStatus) {

        return new Promise((resolve, reject) => {
            HttpService.put(`${HomeworkService.baseUrl()}visibility/` + homeworkId, {desiredVisibilityStatus},
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }


}