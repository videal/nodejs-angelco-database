module.exports = function (mongoose) {
    var companySchema = mongoose.Schema({
        id: {
            type: String,
            unique: true
        },
        name: {
            type: String
        },
        site: {
            type: String
        },
        jobs: {
            type: Array,
            "default": []
        },
        founders: {
            type: Array,
            "default": []
        },
        dateModified: {
            type: Date,
            "default": Date.Now
        }
    });
    return mongoose.model('Company', companySchema);
};