module.exports = (function () {
    //ALTER TABLE `proof_mst` ADD CONSTRAINT uc_pm_mst UNIQUE (`pm_certificate`);
       var sql_api = require('./sql_api');
       var sqlapi = new sql_api();
       var validate_api = require('./validate_api');
       var valapi = new validate_api();
       var utility = require('../utility');
       var Q = require('q');
       
   
       var publicObject = {
              add: function (requestData) {
   
               var deferred = new Q.defer();
   
               console.log(requestData);
               requestData.description = typeof requestData.description !== "undefined" ? requestData.description : '';
               requestData.ProjectName = typeof requestData.ProjectName !== "undefined" ? requestData.ProjectName : '';
   
               var dataJson = {
                ProjectName: requestData.ProjectName,
                description: requestData.description,
               };
                                    
               var promises = [
                  
               ];
   
               Q.allSettled(promises)
                   .then(result => {
                      
   
                       var msg = [];
                       for (var i = 0; i < result.length; i++) {
                           if (result[i].state == 'rejected') {
                               msg.push(result[i].reason);
                           }
                       }
                       if (msg.length == 0) {
                            
                           sqlapi.insertData('INSERT INTO `tm_project` (`project`,`description`) VALUES (:ProjectName,:description)', dataJson)
                               .then(function (results) {
                            
                                        reslog = {
                                           error: 'false',
                                           message: 'Project Created Successfully'
                                       };
                                       deferred.resolve(reslog);
                                   
                               }).catch(function (err) {
                                    reslog = {};
                                   if (err.name == "SequelizeUniqueConstraintError") {
                                       reslog = { error: 'true', message: ' Proof Name Already Exists' }
                                   } else {
                                       reslog = {
                                           error: 'true',
                                           message: err
                                       };
                                   }
                                   deferred.reject(reslog);
                               }); 
                       } else {
                           var reslog = {
                               error: 'true',
                               message: msg
                           };
                           deferred.reject(reslog);
                       }
                   })
               return deferred.promise;
           },
   
           ProjectSite: function (requestData) {
               var deferred = new Q.defer();
               console.log(requestData);            
               requestData.selectProject = typeof requestData.selectProject !== "undefined" ? requestData.selectProject : '';
               requestData.lat = typeof requestData.lat !== "undefined" ? requestData.lat : '';
               requestData.lng = typeof requestData.lng !== "undefined" ? requestData.lng : '';
               requestData.sitename = typeof requestData.sitename !== "undefined" ? requestData.sitename : '';   
   
               var dataJson = {
                sitename: requestData.sitename,             
                lat: requestData.lat,
                lng: requestData.lng,
                selectProject: requestData.selectProject,
               };
                
               console.log(dataJson);
               var promises = [];
   
               Q.allSettled(promises)
                   .then(result => {
                       var msg = [];
                       for (var i = 0; i < result.length; i++) {
                           if (result[i].state == 'rejected') {
                               msg.push(result[i].reason);
                           }
                       }
                       if (msg.length == 0) {
                           sqlapi.updateData('UPDATE `tm_project` SET `sitename`=:sitename,`lat`=:lat,`lng`=:lng  WHERE id=:selectProject', dataJson)
                               .then(function (results) {
                                    reslog = {
                                       error: 'false',
                                       message: 'Project  Updated Successfully'
                                   };
                                   deferred.resolve(reslog);
                               }, function (err) {
                                    reslog = {};
                                   if (err.name == "SequelizeUniqueConstraintError") {
                                       reslog = { error: 'false', message: '  Already Exists' }
                                   } else {
                                       reslog = {
                                           error: 'false',
                                           message: err
                                       };
                                   }
                                   deferred.reject(reslog);
                               });
                       } else {
                           var reslog = {
                               error: 'false',
                               message: msg
                           };
                           deferred.reject(reslog);
                       }
                   });
               return deferred.promise;
           },
   

           getfilter: function (requestData) {
            var deferred = new Q.defer();
            try {
                console.log(requestData);
                requestData  = typeof requestData !== "undefined" ? requestData  : '';
                
                var dataJson = {
                    id: requestData ,
                };
                var whereCondition = ' WHERE id=:id ';

                sqlapi.selectData('SELECT * FROM `tm_project`  ' + whereCondition, dataJson)
                    .then(function (results) {
                         reslog = {
                            error: 'false',
                            message: results.length > 0 ? ' listed Successfully' : 'Data not found',
                            data: results[0],
                        };
                        deferred.resolve(reslog);
                    }).catch(function (err) {
                         reslog = {
                            error: 'true',
                            message: err
                        };
                        deferred.reject(reslog);
                    });
            } catch (err) { 
                var reslog = {
                    error: 'error',
                    message: err
                };
                deferred.reject(reslog);
            }

            return deferred.promise;
        },
   

           get: function () {
            var deferred = new Q.defer();
            sqlapi.selectData('SELECT * FROM `tm_project` ')
                .then(function (results) {
                    var reslog = {
                        status: 'success',
                        message: 'DSC i listed Successfully',
                        data: results
                    };
                    deferred.resolve(reslog);
                }, function (err) {
                    var reslog = {
                        status: 'error',
                        message: err
                    };
                    deferred.reject(reslog);
                });
            return deferred.promise;
        },









   
   
       };
   
       return publicObject;
   })();