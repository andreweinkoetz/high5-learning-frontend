import HttpService from './HttpService';

export default class SubmissionService {

    /**
     * base url of the submission rest api
     * @returns {string}
     */
    static baseUrl() {
        return HttpService.apiURL() + "/submission/";
    }

    /**
     * get all submission of the students of this homework
     * @param homeworkId
     * @returns {Promise<any>}
     */
    static getSubmissionOfHomework(homeworkId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SubmissionService.baseUrl()}` + homeworkId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        })
    }

    /**
     * get the submission of one student for this homework with homeworkId
     * @param homeworkId
     * @returns {Promise<any>}
     */
    static getSubmissionOfHomeworkOfStudent(homeworkId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SubmissionService.baseUrl()}user/` + homeworkId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        })
    }

    /**
     * gets a key-value pair of homeworkId, rankingPosition, ranked by timestamp
     * @param classId
     * @returns {Promise<any>}
     */
    static getRankingOfSubmissions(classId) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${SubmissionService.baseUrl()}ranking/` + classId, function (data) {
                resolve(data);
            }, function (textStatus) {
                reject(textStatus);
            });
        })
    }

    /**
     * add a new submission
     * @param submissionToAdd
     * @returns {Promise<any>}
     */
    static addNewSubmission(submissionToAdd) {
        return new Promise((resolve, reject) => {
            HttpService.post(`${SubmissionService.baseUrl()}`, submissionToAdd,
                function (data) {
                    resolve(data);
                }, function (textStatus) {
                    reject(textStatus);
                });
        })
    }

}






