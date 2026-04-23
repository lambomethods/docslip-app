const http = require('http');

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/dashboard',
  method: 'GET',
}, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, '\nDATA:', data.substring(0, 500)));
});
req.on('error', (e) => console.error(`problem with request: ${e.message}`));
req.end();
