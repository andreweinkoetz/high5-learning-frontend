import HttpService from './HttpService';

export default class SubmissionService {

    static baseUrl() {
        return HttpService.apiURL() + "/submission/";
    }

    static getSubmissionOfHomework(homeworkId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SubmissionService.baseUrl()}` + homeworkId, function (data) {
                resolve(data);
            }, function (textStatus) {
                resolve(textStatus);
            });
        })
    }


    static getSubmissionOfHomeworkOfStudent(homeworkId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SubmissionService.baseUrl()}/user/` + homeworkId, function (data) {
                resolve(data);
            }, function (textStatus) {
                resolve(textStatus);
            });
        })
    }


    static addNewSubmission(submissionToAdd) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${SubmissionService.baseUrl()}`, submissionToAdd,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    resolve(textStatus);
                });
        })
    }

}






