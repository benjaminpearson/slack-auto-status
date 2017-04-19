const _ = require('lodash');
const config = require('../config');
const Slack = require('../lib/slack');

const update = (emoji, text, callback = _.noop) => {
  // Handle multiple slack accounts
  const apiKeys = config.get('slack:apiKeys');
  _.forEach(apiKeys, (apiKey) => {
    const slack = new Slack(apiKey);
    slack.updateStatus(emoji, text, callback);
  });
};

module.exports = update;
