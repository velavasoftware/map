const GLOBAL = require('../../Globals');
var CryptoJS = require("crypto-js");
export const IndexServices = {
    ProjectCreate,
    ProjectGet,
    getfilter,
    ProjectSite,
  
};

function ProjectCreate(data) {
    data = CryptoJS.AES.encrypt(JSON.stringify(data), GLOBAL.PassKey).toString();
    const  requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data})
        };
        return fetch(GLOBAL.API_URL+`api/ProjectAdd`, requestOptions)
            .then(handleResponse)
           
    }
 
    
    
function ProjectSite(data) {
    data = CryptoJS.AES.encrypt(JSON.stringify(data), GLOBAL.PassKey).toString();
    const  requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data})
        };
        return fetch(GLOBAL.API_URL+`api/ProjectSite`, requestOptions)
            .then(handleResponse)
           
    }
function ProjectGet(data) {
    data = CryptoJS.AES.encrypt(JSON.stringify(data), GLOBAL.PassKey).toString();
    const  requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data})
        };
        return fetch(GLOBAL.API_URL+`api/ProjectGet`, requestOptions)
            .then(handleResponse)
           
    }
 
function  getfilter(data) {
    data = CryptoJS.AES.encrypt(JSON.stringify(data), GLOBAL.PassKey).toString();
    const  requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data})
        };
        return fetch(GLOBAL.API_URL+`api/getfilter`, requestOptions)
            .then(handleResponse)
           
    }
 
   
function handleResponse(response) {
    return response.text().then(text => {
        var bytes = CryptoJS.AES.decrypt(text, GLOBAL.PassKey);
        if(bytes.toString(CryptoJS.enc.Utf8)){
         var requestData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        }
        const data = requestData ;
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
              //  logout();
             //   location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
