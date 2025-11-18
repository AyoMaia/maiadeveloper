module.exports = {
  apps: [{
    name: 'landing-dev',
    script: 'npm',
    args: 'run start',
    cwd: '/var/www/landing-dev',
    env: {
      PORT: 3001,
      NODE_ENV: 'production'
    }
  }]
};
