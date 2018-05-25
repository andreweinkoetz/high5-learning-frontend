import HttpService from './HttpService';

export default class ClassService {

    static baseUrl() {
        return "http://localhost:3000/classes"
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


}