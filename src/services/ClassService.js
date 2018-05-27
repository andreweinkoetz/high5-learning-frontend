import HttpService from './HttpService';

export default class ClassService {

    static baseUrl() {
        return HttpService.apiURL() + "/classes";
    }

    static getClasses(){
        return new Promise((resolve, reject) => {
            HttpService.get(`${ClassService.baseUrl()}`, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }

    static addNewClass(){

        const newClass = {
            title: "Chemistry",
            description: "Easy level intro for IT students"
        }

        return new Promise((resolve, reject) => {
            HttpService.post(`${ClassService.baseUrl()}`, newClass,
                function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });

    }


}