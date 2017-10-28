const fs = require('fs');

module.exports = {
  setNotification: function(msg) {
    const obj = fs.readFileSync('../services/notification.json', 'utf8');
    console.log(obj)
    obj.push({"message": msg, "read": false})
    // const lastNotification = Object.keys(obj).length;
    // obj[lastNotification+1] = msg;
    // const json = JSON.stringify(obj);
    fs.writeFile('../services/notification.json', json);
  }
};