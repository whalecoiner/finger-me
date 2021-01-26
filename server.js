// Based on code found at:
// https://gist.github.com/mcroydon/519344/09979e74352594f670477efda7f0306519e6cd1b

const net = require('net')

const art = require('./art')

// User data
const users = {
  charlie: {
    username: 'charlie',
    name: 'Charlie Owen',
    twitter: 'sonniesedge',
    plan: 'Keep surviving the churn.'
  }
}

// Padding for user lists.
const pad = function (string, length) {
  length = length || 20
  while (string.length <= length) {
    string = string + ' '
  }
  return string
}

// Disregard verbosity and strip trailing <CR><LF>
const cleanData = function (string) {
  return string.replace('/W', '').replace('\r\n', '')
}

net.createServer(function (socket) {
  socket.setEncoding('ascii')

  socket.on('data', function (data) {
    console.log('Starting connection.')
    if (data === '\r\n') {
      console.log('Serving index.')
      socket.write(pad('Login') + pad('Name') + 'Twitter' + '\r\n')
      for (const index in users) {
        const user = users[index]
        socket.write(pad(user.username) + pad(user.name) + user.twitter + '\r\n')
      }
    } else if (cleanData(data) in users) {
      console.log('  Serving user: ' + cleanData(data))
      const user = users[cleanData(data)]
      if (user.username) socket.write('Username: ' + user.username + '\r\n')
      if (user.name) socket.write('Name: ' + user.name + '\r\n')
      if (user.twitter) socket.write('Twitter: ' + user.twitter + '\r\n')
      if (user.plan) socket.write('Plan: ' + user.plan + '\r\n')
      if (user.project) socket.write('Project: ' + user.project + '\r\n')
      socket.write(art.floppyFist)
    } else {
      console.log('Unhandled: ' + cleanData(data))
    }
    socket.end()
  })

  socket.on('end', function () {
    console.log('Ending connection.')
  })
}).listen(7979, '127.0.0.1')

console.log('finger_server.js running. To test, run \'finger @127.0.0.1\'')