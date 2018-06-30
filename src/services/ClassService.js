import HttpService from './HttpService';

export default class ClassService {

    /**
     * the base url of the classes rest api
     * @returns {string}
     */
    static baseUrl() {
        return HttpService.apiURL() + "/classes/";
    }


    /**
     * returns a list of all classes for a user
     * @returns {Promise<any>}
     */
    static getClassesOfUser() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}`,
                function (data) {
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
        });

    }

    /**
     * returns a list of all homework for a user
     * @returns {Promise<any>}
     */
    static getAllHomeworkOfUser() {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}/allhomework/`,
                function (data) {
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
        });

    }

    /**
     * returns a key-value pair of classId, number of not submitted homework
     * @param classId
     * @returns {Promise<any>}
     */
    static getOpenHomeworkOfStudent(classId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}/openhw/` + classId,
                function (data) {
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
        });
    }

    /**
     * returns list of homework of one class (for class detail view)
     * @param classId
     * @returns {Promise<any>}
     */
    static getHomeworkOfClass(classId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}` + classId, function (data) {
                resolve(data);
            }, function (error) {
                reject(error);
            });
        });

    }

    /**
     * adds the new class into the database
     * @param classToAdd
     * @returns {Promise<any>}
     */
    static addNewClass(classToAdd) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${ClassService.baseUrl()}`, classToAdd,
                function (data) {
                    resolve(data);
                }, function (error) {
                    reject(error);
                });
        });

    }

    /**
     * updates an existing class
     * @param classToUpdate
     * @param classId
     * @returns {Promise<any>}
     */
    static updateClass(classToUpdate, classId) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${ClassService.baseUrl()}` + classId, classToUpdate,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }

    /**
     * deletes an existing class
     * @param classId
     * @returns {Promise<any>}
     */
    static deleteClass(classId) {
        return new Promise((resolve, reject) => {
            HttpService.delete(`${ClassService.baseUrl()}` + classId,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }

    /**
     * returns a list of all students that are assigned to a specific class
     * @param classId
     * @returns {Promise<any>}
     */
    static getStudentsOfClass(classId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}students/` + classId,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        });

    }

}