var CronJob = require('cron').CronJob;

module.exports = {
  executeOnceEveryDayAtMidnight,
};

function executeOnceEveryDayAtMidnight(callback) {
  new CronJob(
    '00 00 00 * * *',
    () => {
      callback();
    },
    null,
    true,
    'America/Los_Angeles'
  );
}
