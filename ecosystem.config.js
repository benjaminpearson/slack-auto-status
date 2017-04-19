module.exports = {
  apps: [
    {
      name: 'slack-auto-status',
      script: 'app.js',
      watch: true,
      args: 'scanAndUpdate'
    },
  ],
};
