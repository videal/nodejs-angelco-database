const mongoose = require('mongoose');
const configurations = require('./configurations.js');
const company = require('./controllers/company.js')(mongoose);
const downloadTask = require('./controllers/downloadTask.js')(mongoose);
const taskCompany = require('./controllers/taskCompany.js')(mongoose);

module.exports = (connectionString) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(`${connectionString ? connectionString : configurations.connectionString}`);

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', console.log.bind(console, 'Connection was created'));
  return {
    company,
    downloadTask,
    taskCompany
  };
}