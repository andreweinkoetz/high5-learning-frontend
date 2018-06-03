import config from '../config';

export default class HttpService {

    static apiURL() {
        return config.backendUrl;
    }

    static get(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(url, {
            method: 'GET',
            headers: header
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else if (this.checkIfUnauthorized(resp)) {
                let res = this.addErrorMessageUnauthorized(resp);
                onError({code: resp.status, title: res.error, msg: res.message});

            } else if (this.checkIfForbidden(resp)) {
                let res = this.addErrorMessageForbidden(resp);
                onError({code: resp.status, title: res.error, msg: res.message});
            }
            else {
                resp.json().then((json) => {
                    onError({code: resp.status, title: json.error, msg: json.message});
                });
            }
        }).then((resp) => {
            if (resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
            }
            onSuccess(resp);
        }).catch(() => {
            onError({code: 500, title: 'Server error', msg: 'Failed to contact backend'});
        });
    }

    static put(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'PUT',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else if (this.checkIfUnauthorized(resp)) {
                let res = this.addErrorMessageUnauthorized(resp);
                onError({code: resp.status, title: res.error, msg: res.message});

            } else if (this.checkIfForbidden(resp)) {
                let res = this.addErrorMessageForbidden(resp);
                onError({code: resp.status, title: res.error, msg: res.message});
            }
            else {
                resp.json().then((json) => {
                    onError(json.error);
                });
            }
        }).then((resp) => {
            if (resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
            }
            onSuccess(resp);
        }).catch((e) => {
            onError(e.message);
        });
    }

    static post(url, data, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }
        header.append('Content-Type', 'application/json');

        fetch(url, {
            method: 'POST',
            headers: header,
            body: JSON.stringify(data)
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else if (this.checkIfUnauthorized(resp)) {
                let res = this.addErrorMessageUnauthorized(resp);
                onError({code: resp.status, title: res.error, msg: res.message});

            } else if (this.checkIfForbidden(resp)) {
                let res = this.addErrorMessageForbidden(resp);
                onError({code: resp.status, title: res.error, msg: res.message});
            }
            else {
                resp.json().then((json) => {
                    onError({code: resp.status, title: json.error, msg: json.message});
                });
            }
        }).then((resp) => {
            if (resp.hasOwnProperty('token')) {
                window.localStorage['jwtToken'] = resp.token;
            }
            onSuccess(resp);
        }).catch(() => {
            onError({code: 500, title: 'Server error', msg: 'Failed to contact backend'});
        });
    }

    static remove(url, onSuccess, onError) {
        let token = window.localStorage['jwtToken'];
        let header = new Headers();
        if (token) {
            header.append('Authorization', `JWT ${token}`);
        }

        fetch(url, {
            method: 'DELETE',
            headers: header
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            }
            else if (this.checkIfUnauthorized(resp)) {
                let res = this.addErrorMessageUnauthorized(resp);
                onError({code: resp.status, title: res.error, msg: res.message});

            } else if (this.checkIfForbidden(resp)) {
                let res = this.addErrorMessageForbidden(resp);
                onError({code: resp.status, title: res.error, msg: res.message});
            }
            else {
                resp.json().then((json) => {
                    onError(json.error);
                });
            }
        }).then((resp) => {
            onSuccess(resp);
        }).catch((e) => {
            onError(e);
        });
    }

    static checkIfUnauthorized(res) {
        return (res.status === 401);
    }

    static addErrorMessageUnauthorized(res) {
        let resUpdate = {...res};
        resUpdate["error"] = "Unauthorized";
        resUpdate["message"] = "Please login or register.";
        return resUpdate;
    }

    static checkIfForbidden(res) {
        return (res.status === 403);
    }

    static addErrorMessageForbidden(res) {
        let resUpdate = {...res};
        res["error"] = "Forbidden";
        res["message"] = "You are not allowed to use this feature.";
        return resUpdate;
    }

}