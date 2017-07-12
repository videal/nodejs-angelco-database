module.exports = mongoose => {
    var personSchema = require('../models/person')(mongoose);
    return {
        Save: model => { 
            return new Promise((resolve, reject) => {
                var person = personSchema({
                    firstName: model.firstName,
                    lastName: model.lastName,
                    companyName: model.companyName,
                    companySite: model.companySite,
                    position: model.position,
                    emails: model.emails
                });
                person.save((error, document) => {
                    if (error != undefined) {
                        if (error.code == 11000) {
                            resolve();
                        } else {
                            reject(error);
                        }
                    }
                    if (undefined != document) {
                        resolve(document);
                    } else {
                        resolve(true);
                    }
                });
            });
        }
    }
};