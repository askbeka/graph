import 'whatwg-fetch';

const headers = new Headers({
    'Content-Type': 'application/json',
    'X-Access-Token': document.cookie.split('token=')[1]
});

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

const parse = (res) => res.json();

export const getHash = () => fetch('/hash').then(parse);

export const getData = () => fetch('/data', {headers}).then(checkStatus).then(parse);

export const pushData = (data) => {

    const
        body = JSON.stringify(data);

    return fetch('/data', {method: 'POST', body, headers});

};
