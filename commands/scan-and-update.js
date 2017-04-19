const _ = require('lodash');
const config = require('../config');
const store = require('../lib/store');
const scan = require('./scan');
const update = require('./update');

const locations = config.get('locations');;
let currentLocation = null;

const scanAndUpdate = () => {
  // Check whether a override status exists
  // If it hasn't yet expired then keep the manual
  // status and don't update based on wifi
  const expires = store.get('expires').value();
  if (expires > +(new Date())) {
    // Reset the location so that when wifi scanning
    // resumes it will update the status automatically
    currentLocation = null;
    return;
  }
  // Otherwise scan wifis and update automatically
  scan((err, ssids) => {
    locations.some((location) => {
      if (_.intersection(_.flatten([location.networks]), ssids).length) {
        if (currentLocation !== location) {
          update(location.emoji, location.text, (err) => {
            if (!err) {
              currentLocation = location;
            }
          });
        }
        return true;
      }
    });
  });
}

module.exports = scanAndUpdate;
