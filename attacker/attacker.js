const http2 = require('http2');
const fs = require('fs');
const net = require('net');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Define the options for the HTTP/2 connection
const options = {
  ca: fs.readFileSync('localhost-cert.pem'), // Specify the CA certificate file
  secureProtocol: 'TLSv1_2_method',
  ciphers: 'AES128-GCM-SHA256'
};

// Establish the HTTP/2 connection

function sendRequest() {
const client = http2.connect('https://172.17.0.2:3000',options);
// const client = http2.connect('https://localhost:3000', options);

// Once the connection is established
client.on('connect', () => {
  console.log('Connection established');

  // Send a request
  const req = client.request({
    ':method': 'GET', // HTTP method
    ':path': '/', // Path to your server's endpoint
    'content-type': 'application/json', // Example header, add more as needed
  });

  // Immediately close the stream after sending request headers
  req.close(http2.constants.NGHTTP2_INTERNAL_ERROR);
  console.log('RST_STREAM sent');

  // Handle the response headers
  req.on('response', (headers, flags) => {
    console.log(`Received headers: ${JSON.stringify(headers)}`);
  });

  // Handle the response data
  req.on('data', (chunk) => {
    console.log(`Received data: ${chunk}`);
  });

  // Handle the end of the response
  req.on('end', () => {
    console.log('No more data received');
    // Close the connection after receiving the response
    client.close();
    console.log('Connection closed by client');
  });

  // Handle errors
  req.on('error', (error) => {
    console.error(`Request error: ${error}`);
  });
});

}

// Schedule requests at intervals
const interval = 1000 / 2; // Interval in milliseconds for 50 requests per second
const requestId = setInterval(sendRequest, interval);

// Stop sending requests after 10 seconds
setTimeout(() => {
  clearInterval(requestId);
}, 100000); // Stop after 10 seconds