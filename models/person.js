module.exports = function (mongoose) {
    var companySchema = mongoose.Schema({
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        companyName: {
            type: String
        },
        companySite: {
            type: String
        },
        position: {
            type: String
        },
        emails: {
            type: Array,
            "default": []
        },
        dateModified: {
            type: Date,
            "default": Date.Now
        }
    });
    return mongoose.model('Person', companySchema);
};