/**
 * @file contains utility functions for Chat application.
 */
var Q = require('q');
var data = require('./dbConnection');
var sharedData = data();
var bunyan = require('bunyan');
var moment = require('moment');

// Nodejs encryption with CTR
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
const algorithmNew = 'aes-128-cbc';
const iv = crypto.randomBytes(16);
const salt = "creatahtech";
const hash = crypto.createHash("sha1");
var CryptoJS = require("crypto-js");
var CryptoJSKey = "CREATAH";
hash.update(salt);

// `hash.digest()` returns a Buffer by default when no encoding is given
var key = hash.digest().slice(0, 16);

module.exports = (function () {
    var PublicObject = {
        /**
         * Helper function to make logs.
         */
        getIsoDate: function (inputDate) {
            return moment(inputDate).format("YYYY-MM-DD");
        },
        getDateDiff: function (fromDate, toDate) {
            var a = moment(fromDate);
            var b = moment(toDate);
            return a.diff(b); // 86400000
        },
        getLog: function () {
            if (!this.log) {
                //this.log = bunyan.createLogger({});
                this.log = bunyan.createLogger({
                    name: 'chat',
                    streams: [{
                        level: 'info',
                        stream: process.stdout
                    }, {
                        level: 'info',
                        path: sharedData.logs.info
                    }]
                });

            }
            return this.log;
        },
        getClientErrorLog: function () {
            //this.log = bunyan.createLogger({});
            var log;
            log = bunyan.createLogger({
                name: 'mobile',
                streams: [{
                    level: 'info',
                    stream: process.stdout
                }, {
                    level: 'info',
                    path: sharedData.logs.ClientError
                }]
            });

            return log;
        },
        encrypt: function (text) {
            var cipher = crypto.createCipher(algorithm, password)
            var crypted = cipher.update(text, 'utf8', 'hex')
            crypted += cipher.final('hex');
            return crypted;
        },
        encrypt1: function (text) {
            var cipher = crypto.createCipheriv(algorithmNew, key, iv);
            var crypted = cipher.update(text, 'utf8', 'hex')
            crypted += cipher.final('hex');
            return crypted;
        },
        randomAlphanumeric: function (length) {
            return PublicObject.randomString(length, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        },
        encryptAngular: function (msgData) {
            let msg = msgData.toString();
            // console.log(key, msg);
            if (!msg) {
                return '';
            }
            let err = '[encryption error]';
            // let key = 'key';
            let passphrase = CryptoJSKey;
            let encrypted;
            try {

                encrypted = CryptoJS.RC4.encrypt(msg, CryptoJSKey);
            } catch (e) {
                //   CryptoService.validkey$.next({status: false, message: e.toString()});
                return err;
            }
            encrypted = encrypted ? encrypted.toString() : '';
            let hmac = CryptoJS.HmacSHA256(encrypted, CryptoJS.SHA256(passphrase)).toString();
            let returnData = hmac + encrypted;
            let replace = /[/]/gi;
            returnData = returnData.replace(replace, '-slash-');
            // console.log(encodeURI(returnData));
            return encodeURIComponent(returnData);
        },

        CnvUnxTmStpToDate: function (value, format) {
            // if (value > 999999999) {
            // if ((value + "").length > 10) {
            value = value / 1000;
            // }
            var date = "";
            // var d = new Date(parseInt(value));
            // var dte = new Date(value).getTime() / 1000;	/*03-aug-2016, nov-2017-29, 2016-sep-17*/
            if (!format) {
                format = "DD MMM YYYY"
            }
            // date = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();
            // date = format.replace(new RegExp("DD", 'g'), d.getDate())
            //   .replace(new RegExp("MMM", 'g'), (d.getMonth() + 1))
            //   .replace(new RegExp("YYYY", 'g'), d.getFullYear());
            date = moment.unix(value).format(format);
            return date;
        },
        CnvUnxTmStp: function (value) {
            var dte = new Date(value).getTime(); /*03-aug-2016, nov-2017-29, 2016-sep-17*/
            return Math.round(dte);
        },
        Cnv24To12Hrs: function (time) {
            // Check correct time format and split into components
            time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
            if (time.length > 1) { // If time format correct
                time = time.slice(1); // Remove full string match value
                time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
                time[0] = +time[0] % 12 || 12; // Adjust hours
            }
            return time.join(''); // return adjusted time or original string
        },
        CnvDteFrmt: function (value) {
            var d = new Date(value),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            return [day, month, year].join('-');
        },
        ddmmyyyyToTimestatmp: function (value) {
            try {
                var date = new Date(value.split("-").reverse().join("-")).getTime();
                return date;
            } catch (e) {
                return 0;
            }
        },
        startOfDayTimestatmp: () => {
            return +moment().startOf('day');
        },
        startOfWeekTimestatmp: () => {
            return +moment().startOf('week');
        },
        startOfMonthTimestatmp: () => {
            return +moment().startOf('month');
        },
        startOfYearTimestatmp: () => {
            return +moment().startOf('year');
        },
        CnvTounique: function (value) {
            //Converting the list of numbers with unique list for eg.,  1,2,3,3,4,4,5,3 to 1,2,3,4,5
            var uniqueList = value.split(',').filter(function (item, i, allItems) { // filter duplicate numbers for eg., 46,47,46,48
                return i == allItems.indexOf(item);
            }).join(',');
            return uniqueList;
        },
        CnvXmppUid: function (value, domainname) { //http://stackoverflow.com/questions/18371339/how-to-retrieve-name-from-email-address
            //Converting the emailid into xmppuid
            // var email = value;
            // var name = email.substring(0, email.lastIndexOf("@"));
            var temp1 = value.replace(/[^a-zA-Z0-9]/g, '-');

            if (domainname.includes('.com')) {
                return (temp1 + '@' + domainname).toLowerCase();
            } else {
                return (temp1 + '@' + domainname + '.com').toLowerCase();
            }
        },
        CreateXmppUid: function (Name, UserID, domainname) {
            var temp1 = Name.replace(/[^a-zA-Z0-9]/g, '-') + "-" + UserID;
            if (domainname.includes('.com')) {
                return (temp1 + '@' + domainname).toLowerCase();
            } else {
                return (temp1 + '@' + domainname + '.com').toLowerCase();
            }
        },
        // Encoding the image from localhost into Byte stream convert callback.
        imageByteStream: function (imageURL) {
            var deferred = new Q.defer();
            var fs = require('fs');
            var bitmap = fs.readFileSync(imageURL);
            // convert binary data to base64 encoded string
            var byteStreamImage = new Buffer(bitmap).toString('base64');
            deferred.resolve(byteStreamImage);
            return deferred.promise;
        },
        // Storing image into localhost
        imageStore: function (imageURL) {
            var deferred = new Q.defer();
            var fs = require('fs');
            //fs.createReadStream(imageURL).pipe(fs.createWriteStream('newLog.log')); // for copy and paste file from localhost
            var request = require('request');
            request.head(imageURL, function (err, res, body) {
                var imgextn = imageURL.split('.').pop(); //get file extension
                var imgnme = '';
                var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var curdate = Math.round(new Date().getTime() / 1000); // Current date
                for (var i = 4; i > 0; --i) imgnme += chars[Math.floor(Math.random() * chars.length)]; //Creating random string

                var imgfullpath = 'public/user_pic/' + curdate + '_' + imgnme + '.' + imgextn;
                //Checking image path for url(server)
                var filter = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/;
                if (filter.test(imageURL) == true) { // server(domain) url
                    request(imageURL).pipe(fs.createWriteStream(imgfullpath)).on('close', function () {
                        deferred.resolve(imgfullpath);
                    });
                } else { //local system or device url
                    fs.createReadStream(imageURL).pipe(fs.createWriteStream(imgfullpath)).on('close', function () {
                        deferred.resolve(imgfullpath);
                    });
                }
            });
            return deferred.promise;
        },
        // Encoding the image from an online url into Byte stream convert callback.
        imageEncode: function (imageURL) {
            var deferred = new Q.defer();
            var request = require('request').defaults({
                encoding: null
            });
            request.get(imageURL, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    //http://stackoverflow.com/questions/8305988/convert-binary-tostringencode64-back-to-binary
                    var base64data = new Buffer(body, 'binary').toString('base64');
                    deferred.resolve(base64data);
                }
            });
            return deferred.promise;
        },

        copyFile: function (source, target) {
            var deferred = new Q.defer();

            var rd = fs.createReadStream(source);
            rd.on("error", function (err) {
                deferred.reject(err);
            });
            var wr = fs.createWriteStream(target);
            wr.on("error", function (err) {
                deferred.reject(err);
            });
            wr.on("close", function (ex) {
                deferred.resolve();
            });
            rd.pipe(wr);

            return deferred.promise;
        },
        extractDomain: function (url) {
            var domain;
            //find & remove protocol (http, ftp, etc.) and get domain
            if (url.indexOf("://") > -1) {
                domain = url.split('/')[2];
            } else if (url.indexOf("//") > -1) {
                domain = url.split('/')[2];
            } else {
                domain = url.split('/')[0];
            }

            //find & remove port number
            domain = domain.split(':')[0];

            return domain;
        },
        extractDomainFromEmail: function (Email) {
            var split = Email.split('@');
            return split[split.length - 1];
        },
        randomString: function (length, chars) {
            var result = '';
            for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
            return result;
        },

        randomNumbers: function (length) {
            return PublicObject.randomString(length, '0123456789');
        },
        xmpp: {
            createGuid: function () {
                function S4() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }
                return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            }
        },
        decrypt: function (text) {
            var decipher = crypto.createDecipher(algorithm, password)
            var dec = decipher.update(text, 'hex', 'utf8')
            dec += decipher.final('utf8');
            return dec;
        },
        StringFieldToJSON: (StringField) => {
            try {
                if (StringField == null) {
                    return {}
                }
                return JSON.parse(StringField)
            } catch (err) {
                return {}
            }
        },
        chainError: function (err) {
            return Q.reject(err);
        },

        checkIfEmailIsString: function (text) {
            var result = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            return result.test(text);
        }
    }
    return PublicObject;
})();