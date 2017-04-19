const _ = require('lodash');
const ms = require('ms');
const config = require('./config');
const commands = require('./commands');
const logger = require('./lib/logger');
const store = require('./lib/store');
const shortcuts = config.get('shortcuts');

require('yargs')
  .usage('$0 <cmd> [args]')
  .command('update', 'make a slack status update', {}, (argv) => {
    // node app.js update home
    // node app.js update "Just hanging"
    // node app.js update home 60m
    // node app.js update "Just hanging" 60m
    // node app.js update "Just hanging" basketball 60m
    logger.info('Updating slack status...');
    const args = argv._.slice(1);
    const payload = shortcuts[args[0]] || { emoji: 'speech_balloon', text: args[0] };
    switch (args.length) {
      case 1:
        // Updates until next auto detection replaces it
        commands.update(payload.emoji, payload.text);
        break;
      case 2:
        const timeout = ms(args[1])
        if (!timeout) {
          commands.update(args[1], args[0]);
        } else {
          commands.update(payload.emoji, payload.text);
          store.set('expires', +(new Date()) + timeout).write();
        }
        break;
      case 3:
        commands.update(args[1], args[0]);
        store.set('expires', +(new Date()) + ms(args[2])).write();
        break;
      default:
        break;
    }
  })
  .command('scan', 'perform a scan of nearby wifi networks and output to console', {}, () => {
    // node app.js scan
    logger.info('Scanning...')
    commands.scan((err, ssids) => {
      if (err) {
        return logger.error('Error scanning wifi networks', err);
      }
      return logger.info(`Found ${ssids.length} networks:\n${ssids.join('\n')}\n`);
    });
  })
  .command('scanAndUpdate', 'start scanning and updating slack at intervals (default 1m, min 15s)', {}, (argv) => {
    // node app.js scanAndUpdate
    // node app.js scanAndUpdate 30s
    const args = argv._.slice(1);
    const min = ms('15s');
    let interval = ms((args[0] || '1m').toString());
    if (interval < min) {
      interval = min;
    }
    logger.info(`Starting scan and update every ${ms(interval, { long: true })}`);
    commands.scanAndUpdate();
    setInterval(commands.scanAndUpdate, interval);
  })
  .help('help')
  .argv
