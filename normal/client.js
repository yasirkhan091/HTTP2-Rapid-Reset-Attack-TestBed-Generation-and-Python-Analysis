const http2 = require('node:http2');
const fs = require('node:fs');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Function to send a request
function sendRequest() {
  const client = http2.connect('https://172.17.0.2:3000', {
    ca: fs.readFileSync('localhost-cert.pem'),
    secureProtocol: 'TLSv1_2_method',
    ciphers: 'AES128-GCM-SHA256'
  });
  client.on('error', (err) => console.error(err));

  const req = client.request({ ':path': '/' });

  req.on('response', (headers, flags) => {
    for (const name in headers) {
      console.log(`${name}: ${headers[name]}`);
    }
  });

  req.setEncoding('utf8');
  let data = '';
  req.on('data', (chunk) => { data += chunk; });
  req.on('end', () => {
    console.log(`\n${data}`);
    client.close();
  });
  req.end();
}

// Schedule requests at intervals
const interval = 1000 / 2; // Interval in milliseconds for 50 requests per second
const requestId = setInterval(sendRequest, interval);

// Stop sending requests after 10 seconds
// setTimeout(() => {
//   clearInterval(requestId);
// }, 100000 * 1000000); // Stop after 10 seconds

// Catch-all error handler
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});


// const http2 = require('http2');
// const fs = require('fs');

// // Function to establish connection and close immediately
// function establishConnection() {
//     const client = http2.connect('https://localhost:3000', {
//       ca: fs.readFileSync('localhost-cert.pem'),
//       // minVersion: 'TLSv1.2', // Set minimum TLS version to TLSv1.2
//       // maxVersion: 'TLSv1.2', // Set maximum TLS version to TLSv1.2
//       secureProtocol: 'TLSv1_2_method',
//       ciphers: 'AES128-GCM-SHA256'
//     });
//     client.on('error', (err) => console.error(err));
    
//     const req = client.request({ ':path': '/' });

//     req.on('response', (headers, flags) => {
//     for (const name in headers) {
//         console.log(`${name}: ${headers[name]}`);
//     }
//     });

//     req.setEncoding('utf8');
//     let data = '';
//     req.on('data', (chunk) => { data += chunk; });
//     req.on('end', () => {
//     console.log(`\n${data}`);
//     client.close();
//     });
//     req.end();


//     // Event handler for the connection
//     client.on('connect', () => {
//         console.log('Connection established.');
        
//         // Immediately close the connection
//         client.close();
//     });
    
//     // Event handler for the connection close
//     client.on('close', () => {
//         console.log('Connection closed.');
//         // Call the function recursively after a small delay
//         setTimeout(establishConnection, 1); // Adjust the delay time as needed
//     });
    
//     // Event handler for errors
//     client.on('error', (err) => {
//         console.error('Error:', err);
//     });
// }

// // Start establishing connections
// for (let i = 0; i < 100; i++) {
//     establishConnection();
// }


