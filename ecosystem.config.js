module.exports = {
  apps: [
    {
      name: 'slack-auto-status',
      script: 'app.js',
      watch: true,
      ignore_watch: ['tmp'],
      args: 'scanAndUpdate'
    },
  ],
};
