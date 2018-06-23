import HttpService from './HttpService';

export default class ClassService {

    static baseUrl() {
        return HttpService.apiURL() + "/classes/";
    }


    // returns a list of all classes for a user
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

    // returns a list of all homework for a user
    static getAllHomeworkOfUser(){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}/allhomework/`,
                function(data) {
                    resolve(data);
                }, function(error) {
                    reject(error);
                });
        });

    }

    // returns a key-value pair of classId, number of not submitted homework
    static getOpenHomeworkOfStudent(classId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}/openhw/` + classId,
                function(data) {
                    resolve(data);
                }, function(error) {
                    reject(error);
                });
        });
    }

    // returns list of homework of one class (for class detail view)
    static getHomeworkOfClass(classId){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}` + classId, function(data) {
                resolve(data);
            }, function(error) {
                reject(error);
            });
        });

    }

    // adds the new class into the database
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

    // updates an existing database
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

    // deletes an existing database
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

    // returns a list of all students that are assigned to a specific class
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