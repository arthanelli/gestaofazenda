const fs = require('fs');

module.exports = {
  setNotification: function(msg) {
    const obj = JSON.parse(fs.readFileSync('../services/notification.json', 'utf8'));
    const lastNotification = Object.keys(obj).length;
    obj[lastNotification+1] = msg;
    const json = JSON.stringify(obj);
    fs.writeFile('../services/notification.json', json);
  }
};