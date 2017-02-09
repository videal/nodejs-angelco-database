module.exports = mongoose => {
    var companySchema = require('../models/company')(mongoose);
    return {
        Save: model => {
            return new Promise((resolve, reject) => {
                var company = companySchema({
                    id: model.id,
                    name: model.name,
                    jobs: model.jobs,
                    site: model.site,
                    founders: model.founders,
                    dateModified: Date.now()
                });
                company.save((error, document) => {
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
        },
        UpdateCompany: models => {
            return new Promise((resolve, reject) => {
                var date = Date.now();
                companySchema.findOneAndUpdate({
                    "name": models.name
                }, {
                        "$set": {
                            "founders": models.founders,
                            "dateModified": date
                        }
                    },
                    (error, document) => {
                        if (error != undefined) {
                            reject(error);
                        }
                        resolve();
                    }
                );
            });
        },
        GetWithUpdate: () => {
            return new Promise((resolve, reject) => {
                var date = Date.now();
                companySchema.findOneAndUpdate({}, {
                    $set: {
                        'dateModified': date
                    }
                }, {
                        upsert: false,
                        sort: {
                            'dateModified': 1
                        }
                    },
                    (error, document) => {
                        if (error != undefined) {
                            reject(error);
                        }
                        resolve(document);
                    });
            });
        },
        Get: filter => {
            return new Promise((resolve, reject) => {
                companySchema.find(filter, (error, documents) => {
                    if (error != undefined) {
                        reject(error);
                    }
                    resolve(documents);
                });
            });
        },
        GetOne: filter => {
            return new Promise((resolve, reject) => {
                companySchema.findOne(filter, (error, documents) => {
                    if (error != undefined) {
                        reject(error);
                    }
                    resolve(documents);
                });
            });
        },
        GetByNumericId: id => {
            return new Promise((resolve, reject) => {
                companySchema.findOne({
                    id: id
                }, (error, document) => {
                    if (error != undefined) {
                        reject(error);
                    }
                    resolve(document);
                });
            });
        },
        Count: () => {
            return new Promise((resolve, reject) => {
                companySchema.count({}, (error, count) => {
                    if (error != undefined) {
                        reject(error);
                    }
                    resolve(count);
                });
            });
        },
        GetCompaniesByArray: data => {
            return new Promise((resolve, reject) => {
                companySchema.find({
                    'id': { $in: data }
                }, (error, documents) => {
                    if (error != undefined) {
                        reject(error);
                    }
                    resolve(documents);
                });
            });
        }
    };
};