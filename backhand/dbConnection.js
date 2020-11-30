/**
 * @file
 * 
 * Connection Object and Static variables.
 * 
 */
module.exports = function () {
    var publicObject = {
        //Database connection
        dbConnect: {
    
            host: 'localhost',
            user: 'root',
            password: '', 
            database: 'testmap',
            charset: 'utf8mb4'
        },
        
        encryptionKey: {
            keyVal: "velava"
        },        
    }
    return publicObject;
}