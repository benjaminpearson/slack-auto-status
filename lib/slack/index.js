const _ = require('lodash');
const https = require('https')
const logger = require('../logger');

class Slack {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  updateStatus(emoji, text, callback = _.noop) {
    const { apiKey } = this;
    const payload = {
      status_text: text,
      status_emoji: `:${emoji}:`,
    };
    const postData = `token=${apiKey}&profile=${encodeURI(JSON.stringify(payload))}`;
    const postOptions = {
      host: 'slack.com',
      port: '443',
      path: '/api/users.profile.set',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'Cache-Control': 'no-cache',
      }
    };

    const request = https.request(postOptions, (res) => {
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        const res = JSON.parse(chunk);
        if (!res.ok) {
          logger.error('Error updating slack', chunk);
          callback(new Error('UPDATE_SLACK_ERROR'));
        } else {
          logger.info(`Updated slack with text '${text}' and emoji ':${emoji}:'`);
          callback();
        }
      });
    });

    request.write(postData);
    request.end();
  }
}

module.exports = Slack;
