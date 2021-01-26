// A config for the PM2 process manager

module.exports = {
  apps : [{
    name: 'finger',
    script: './server.js',
    NODE_ENV: 'production' // set up as a production server
  }]
}
