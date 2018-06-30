import HttpService from './HttpService';

export default class HomeworkService {

    static baseUrl() {
        return HttpService.apiURL() + "/homework/";
    }

    /**
     * Get all information of this homework (incl. exercises etc.) from db
     * @param homeworkId
     * @returns {Promise<any>}
     */
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

    /**
     * Adds a new homework to the database
     * @param classId
     * @param homeworkToAdd
     * @returns {Promise<any>}
     */
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

    /**
     * Updates the homework
     * @param homeworkId
     * @param homeworkToUpdate
     * @returns {Promise<any>}
     */
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

    /**
     * Delete the Homework with homeworkId
     * @param homeworkId
     * @returns {Promise<any>}
     */
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

    /**
     * change the visibility of the homework with homeworkId
     * @param homeworkId
     * @param desiredVisibilityStatus
     * @returns {Promise<any>}
     */
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