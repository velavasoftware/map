/**
 * @file
 * 
 * Connection Object and Static variables.
 * 
 */

module.exports = function () {
    var publicObject = {
        webAdmin: {
            Config: { 
                PATHS: { 
                    TEMP_UPLOAD: "public/uploads/temp/",
                }
            }
        }
    }
    return publicObject;
}