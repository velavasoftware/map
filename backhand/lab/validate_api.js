/**
 * @file
 * 
 * Validate API Callback Details
 * 
 */
module.exports = function () {
    /* use global functions */
    // Modules includes
    var msgapi = require('./msg_api');
    var Q = require('q');

    var publicObject = {
        /**
         * Functions for validation
         */

        // Validation using promises.
        // Check for numeric values
        v_Num: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Number
            };
            if (isNaN(value) || (value == null) || (value == undefined) || ((String(value).replace(/\s/g, "")).length == 0)) { //false
                deferred.reject(Obj);
            } else {
                deferred.resolve("No error");
            } //true
            return deferred.promise;
        },
        // Check for allowed values
        //  0 - Unpublished / Created     / Created     /   Publisher
        //  1 - Published   / Active      / Published   /   Subscriber
        //  2 - Rejected    / Deactivated / Moderation  /   Moderator
        v_012: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Val012
            };
            if ((isNaN(value) == false) && (value >= 0) && (value <= 2) && (value != null) && ((String(value).replace(/\s/g, "")).length != 0)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for allowed values 
        //  0 - Yes / Mute   / Trial  / Inactive  / Disabled
        //  1 - No  / Active / Normal / Active    / Enabled
        v_01: function (fld, value) {
            var deferred = new Q.defer();
            if ((value >= 0) && (value <= 1)) {
                deferred.resolve("No error");
            } //true
            else {
                var Obj = {
                    [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Val01
                };
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for allowed values 
        //  1 - Married   / Assign   / Broadcast    / Embed     / Interest  / Online
        //  2 - Unmarried / Unassign / Conversation / Separate  / Skill     / Offline
        v_12: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Val12
            };
            if ((((value >= 1) && (value <= 2)) && (value != null) && (value != '')) == true) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for allowed values 
        //  1 - on voting     / Male    / Public        / Annual
        //  2 - after closing / Female  / Subscription  / Monthly
        //  3 - do not show   / Other   / Private       / Quarterly
        v_123: function (fld, value) {
            var deferred = new Q.defer();
            if ((((value >= 1) && (value <= 3)) && (value != null) && (value != '')) == true) {
                deferred.resolve("No error");
            } //true
            else {
                var Obj = {
                    [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Val123
                };
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for value must be null
        v_Nl: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Null
            };
            if ((value == null) || (value == 'null')) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for value must not be empty
        v_Emp: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Empty
            };
            try {
                value = value.toString();
            } catch (err) {
                deferred.reject(Obj);
            }
            if ((value == '') || (value == ' ') || (value == null) || (value == undefined) || (value.replace(/\s/g, "").length == 0)) {
                deferred.reject(Obj);
            } //false
            else {
                deferred.resolve();
            } //true
            return deferred.promise;
        },
        // Check for value must not be empty password
        v_EP: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Empty
            };
            // md5 string for empty password 'd41d8cd98f00b204e9800998ecf8427e'
            if ((value == 'd41d8cd98f00b204e9800998ecf8427e')) {
                deferred.reject(Obj);
            } //false
            else {
                deferred.resolve("No error");
            } //true
            return deferred.promise;
        },
        // Check for value must be 0
        v_Zro: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Zero
            };
            if ((value == 0) && (value != null) && (value != '')) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for value must be 1
        v_One: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].One
            };
            if ((value == 1) && (value != null) && (value != '')) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for objects which contains atleast two properties
        /*v_A3_: function (fld, value) {
          var deferred = new Q.defer();
          var Obj = { [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Atl3 };
          if (Object.keys(value).length >= 3) {
            deferred.resolve("No error");
          }
          else {
            deferred.reject(Obj);
          }
          return deferred.promise;
        },*/
        //Array.prototype.unique = function() { return this.reduce(function(accum, current) { if (accum.indexOf(current) < 0) { accum.push(current); } return accum; }, []); }
        // Check for objects which contains atleast three properties
        v_A3: function (fld, value) {
            var deferred = new Q.defer();
            var arrayValue = Object.keys(value).map(function (key) {
                return value[key];
            });
            Array.prototype.unique = function () {
                return this.reduce(function (accum, current) {
                    if (accum.indexOf(current) < 0) {
                        accum.push(current);
                    }
                    return accum;
                }, []);
            }
            if (arrayValue.length >= 3) {
                if (arrayValue.length == arrayValue.unique().length) {
                    deferred.resolve("No error");
                } else {
                    deferred.reject({
                        [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].NRpt
                    });
                }
            } else {
                deferred.reject({
                    [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Atl3
                });
            }
            return deferred.promise;
        },
        v_A2: function (fld, value) {
            var deferred = new Q.defer();
            var arrayValue = Object.keys(value).map(function (key) {
                return value[key];
            });
            Array.prototype.unique = function () {
                return this.reduce(function (accum, current) {
                    if (accum.indexOf(current) < 0) {
                        accum.push(current);
                    }
                    return accum;
                }, []);
            }
            if (arrayValue.length >= 2) {
                if (arrayValue.length == arrayValue.unique().length) {
                    deferred.resolve("No error");
                } else {
                    deferred.reject({
                        [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].NRpt
                    });
                }
            } else {
                deferred.reject({
                    [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Atl2
                });
            }
            return deferred.promise;
        },
        v_A1: function (fld, value) {
            var deferred = new Q.defer();
            try {
                var arrayValue = Object.keys(value).map(function (key) {
                    return value[key];
                });
                Array.prototype.unique = function () {
                    return this.reduce(function (accum, current) {
                        if (accum.indexOf(current) < 0) {
                            accum.push(current);
                        }
                        return accum;
                    }, []);
                }
                if (arrayValue.length >= 1) {
                    if (arrayValue.length == arrayValue.unique().length) {
                        deferred.resolve("No error");
                    } else {
                        deferred.reject({
                            [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].NRpt
                        });
                    }
                } else {
                    deferred.reject({
                        [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Atl1
                    });
                }
            } catch (err) {
                deferred.reject({
                    [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Atl1
                });
            }
            return deferred.promise;
        },
        // Check for value equals current date
        v_CD: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].CurDate
            };
            var usrdte = Math.round(new Date(value).getTime() / 1000); //User defined date
            var now = new Date();
            var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            var curdate = Math.round(startOfDay / 1000); // Current date
            if (usrdte == curdate) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for value greater than current date
        v_GD: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].GtrDate
            };
            var usrdte = Math.round(new Date(value).getTime() / 1000); //User defined date
            var now = new Date();
            var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // find today date's timestamp
            var curdate = Math.round(startOfDay / 1000); // Current date
            if (usrdte > curdate) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for valid email address
        v_Eml: function (fld, value) {
            var deferred = new Q.defer();
            value1 = value.trim();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VEmail
            };
            // var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var filter = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for valid email address
        v_CommaSeparatedEml: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VEmail
            };
            // var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            var filter = /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4})(\s*,\s*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4})*$/g;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for valid phone numbers with 10 numeric characters
        v_Ph: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VPhNr
            };
            var filter = /^[1-9]{1}[0-9]{9}$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for valid mobile number
        // Regex taken from link : http://stackoverflow.com/a/22378975
        v_mobile_number: function (fld, value) {
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VPhNr
            };
            var filter = /^(\+\d{1,3}[- ]?)?\d{10}$/;
            if (filter.test(value)) {
                return Q.resolve("No error");
            } //true
            else {
                return Q.reject(Obj);
            } //false
        },
        //Check for email or phone number, using v_Eml() and v_mobile_number()
        v_email_mobile: function (fld, value) {
            return Q.allSettled([publicObject.v_Eml(fld, value),
                    publicObject.v_mobile_number(fld, value)
                ])
                .then(function (results) {
                    var msg = [];
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].state == 'fulfilled') {
                            return Q.resolve({
                                message: "Valid loginID : " + ((i == 0) ? "email" : "mobile number"),
                                type: i + 1 //1 for email and 2 for number.
                            }); // Do not change this
                        } else if (results[i].state == 'rejected') {
                            msg.push(results[i].reason);
                        }
                    }
                    if (msg.length == 1) {
                        return Q.resolve("No error");
                    } else {
                        return Q.reject("Login ID must me either a valid email ID or mobile number");
                    }
                })
        },
        // Check for day and month - two num chars format (dd-mm)
        v_DM: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VDyMn
            };
            var filter = /^((0?[1-9]|[12][0-9]|3[01]))-(0?[1-9]|1[0-2])$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for day and month and year format (dd-mmm-yyyy / dd-MMM-yyyy)
        v_Dt: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VDate
            };
            var filter = /^([012]?\d|3[01])-([Jj][Aa][Nn]|[Ff][Ee][bB]|[Mm][Aa][Rr]|[Aa][Pp][Rr]|[Mm][Aa][Yy]|[Jj][Uu][Nn]|[Jj][Uu][Ll]|[aA][Uu][gG]|[Ss][eE][pP]|[oO][Cc][Tt]|[Nn][oO][Vv]|[Dd][Ee][Cc])-(19|20)\d\d$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for day and month and year format (dd-mm-yyyy / dd-MM-yyyy) eg : 28-02-2015
        isDateDDMMYYYY: function (fld, value) {
            var deferred = new Q.defer();
            var filter = /(^(((0[1-9]|1[0-9]|2[0-8])[-](0[1-9]|1[012]))|((29|30|31)[-](0[13578]|1[02]))|((29|30)[-](0[4,6,9]|11)))[-](19|[2-9][0-9])\d\d$)|(^29[-]02[-](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } else {
                var Obj = {
                    [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].ddmmyyyy
                };
                deferred.reject(Obj);
            }
            return deferred.promise;
        },
        // Check for Event day and month and year format (yyyy-mm-dd)
        v_EvDt: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VEDate
            };
            var filter = /^[0-9]{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for Event 12 hrs time
        v_Tm: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VTime
            };
            var filter = /^([0]\d|[1][0-2]):([0-5]\d)\s?(?:AM|PM)$/i;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for valid group name with @ symbol present before the domain name. eg., name@domainname format
        v_GN: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VGRP
            };
            var filter = /^[^@]+[@][^@]+$/; //var rex = /^[^_]+[_][^_]+$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
            //str.indexOf("_") !== 0 && str.indexOf("_") !== str.length-1 && str.split("_") === 2
        },
        // Check for valid url image. eg., http://domain.something.jpg
        v_IUrl: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Img
            };
            var filter = /^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for valid hex color value eg., #aaaaaa
        v_Clr: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].VClr
            };
            var filter = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for valid IP address 
        v_IP: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].ValIP
            };
            var filter = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
            ///^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
            //http://www.w3resource.com/javascript/form/ip-address-validation.php            
        },
        // Check for Number with comma seperator eg., 1,2,3,4,5
        v_NC: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].NumCm
            };
            var filter = /^\d+(,\d+)*$/;
            if (filter.test(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for An Array [0,2,4,67]
        v_AR: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].NumCm
            };
            if (Array.isArray(value)) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for the value group or channel 
        v_GPCH: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].GPCH
            };
            if ((value == 'group') && (value != null) && (value != '') || (value == 'channel') && (value != null) && (value != '')) {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for the value "Yes or No or All"
        v_YNA: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].YNA
            };
            if (value == 'yes' || value == 'no' || value == 'all') {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        // Check for the value "True or False"
        v_TF: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].TF
            };
            if (value == true || value == false || value == "true" || value == "false") {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },

        //validation for profile field in domainemailwhitelist table
        //supports both synchronous and asynchronous
        v_profile_whitelist: function (Profile, SuccessCallback, FailCallback) {
            try {
                var response = {
                    data: Profile
                };
                if (Profile.hasOwnProperty("City") && Profile.hasOwnProperty("Company") && Profile.hasOwnProperty("LastName") && Profile.hasOwnProperty("Location") && Profile.hasOwnProperty("FirstName") && Profile.hasOwnProperty("Department") && Profile.hasOwnProperty("MobileNumber")) {
                    if (SuccessCallback) {
                        SuccessCallback(response);
                    }
                    return Q.resolve();
                } else {
                    if (FailCallback) {
                        FailCallback();
                    }
                    return Q.reject();
                }

            } catch (err) {
                if (FailCallback) {
                    FailCallback();
                }
                return Q.reject();
            }
        },
        v_profile_field: function (fld, FieldName) {
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].YNA
            };
            if ((FieldName).toLowerCase() == "company" || (FieldName).toLowerCase() == "city" || (FieldName).toLowerCase() == "department" || (FieldName).toLowerCase() == "designation" || (FieldName).toLowerCase() == "location") {
                return Q.resolve("No error");
            } else {
                return Q.reject(Obj);
            }
        },
        //version number should be of the form v1.0.0
        v_version_number: function (fld, value) {
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Generic
            };
            if (value != undefined && value.startsWith("v") && value.split('.').length == 3) {
                return Q.resolve("No error");
            } else {
                return Q.reject(Obj);
            }
        },
        v_ostype: function (fld, value) {
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Generic
            };
            if ((value).toLowerCase() == "electron" || (value).toLowerCase() == "ios" || (value).toLowerCase() == "android") {
                return Q.resolve("No error");
            } else {
                return Q.reject(Obj);
            }
        },
        // Check for dynamic regex validation
        dynamic_val: function (fld, filter, msg, value) {
            try {
                value1 = value.trim();
                var deferred = new Q.defer();
                var regex = new RegExp(filter);
                var Obj = {
                    fieldColumn: fld,
                    errMsg: msg
                };
                if (String(value1).match(regex)) {
                    deferred.resolve("No error");
                } //true
                else {
                    deferred.reject(Obj);
                } //false
            } catch (err) {
                deferred.reject(err);
            }
            return deferred.promise;
        },
        v_EmpDynamic: function (fld, value) {
            value = value.toString();
            var deferred = new Q.defer();
            var Obj = {
                fieldColumn: fld,
                errMsg: "This field is Required"
            }; //{ [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Empty };
            if ((value == '') || (value == ' ') || (value == null) || (value == undefined) || (value.replace(/\s/g, "").length == 0)) {
                deferred.reject(Obj);
            } //false
            else {
                deferred.resolve();
            } //true
            return deferred.promise;
        },
        // Check for dynamic regex validation
        language_val: function (fld, value) {
            var deferred = new Q.defer();
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Generic
            };
            if (value == "ta" || value == "en") {
                deferred.resolve("No error");
            } //true
            else {
                deferred.reject(Obj);
            } //false
            return deferred.promise;
        },
        //Check routing 
        v_routing: function (fld, FieldName) {
            var Obj = {
                [fld]: msgapi.v_txt[0][fld] + ' ' + msgapi.v_typ[0].Routing
            };
            if ((FieldName).toLowerCase() == "automatic" || (FieldName).toLowerCase() == "manual") {
                return Q.resolve("No error");
            } else {
                return Q.reject(Obj);
            }
        },
    };
    return publicObject;
};