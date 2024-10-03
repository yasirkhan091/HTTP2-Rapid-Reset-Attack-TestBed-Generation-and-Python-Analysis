const http2 = require('node:http2');
const fs = require('node:fs');

const server = http2.createSecureServer({
  key: fs.readFileSync('localhost-privkey.pem'),
  cert: fs.readFileSync('localhost-cert.pem'),
  // secureProtocol: 'TLSv1_2_method',
  // ciphers: 'AES128-GCM-SHA256'

  secureOptions: http2.constants.SSL_OP_NO_TLSv1 | http2.constants.SSL_OP_NO_TLSv1_1,
  minVersion: 'TLSv1.2',
  maxVersion: 'TLSv1.3',
  cipherSuites: [
    'TLS_AES_128_GCM_SHA256',
    'TLS_AES_256_GCM_SHA384',
    'TLS_CHACHA20_POLY1305_SHA256',
    'TLS_AES_128_CCM_SHA256',
    'TLS_AES_128_CCM_8_SHA256',
    // Add other non-ECDH cipher suites as needed
  ].join(':'),
});

server.on('error', (err) => {
  // Log the error without terminating the server
  console.error('Server error:', err);
});

server.on('stream', (stream, headers) => {
  // Log that a request has been received
  console.log('Request received from client');

  setTimeout(() => {
    stream.respond({
      'content-type': 'text/html; charset=utf-8',
      ':status': 200,
    });
    stream.end('<h1>Hello World</h1>');
  }, 200); // Adjust the delay as needed
});

server.listen(3000, '0.0.0.0', () => console.log("Server listening at port 3000"));

// Catch-all error handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
