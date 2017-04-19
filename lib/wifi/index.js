const _ = require('lodash');
const wifi = require('node-wifi');
const logger = require('../logger');

class WiFi {
  static ssids(callback = _.noop) {
    wifi.init({ iface : null });
    wifi.scan((err, networks) => {
      if (err) {
        logger.error('Error scanning', err);
        return callback(new Error('WIFI_SCAN_ERROR'));
      }
      return callback(null, _.map(networks, (network) => network.ssid));
    });
  }
};

module.exports = WiFi;
