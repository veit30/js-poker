// Load HTTP module
const http = require("http");
const os = require('os');

let networkInterfaces = os.networkInterfaces();
let addresses = [];
Object.keys(networkInterfaces).forEach(function (ifname) {
  var alias = 0;

  networkInterfaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      addresses.push(
        {
          name: ifname,
          address: iface.address
        }
      )
      // console.log(ifname, iface.address);
    }
    ++alias;
  });
});

console.log(addresses);

const hostname = addresses.reduce((a,c) => {
  return c.name === 'WLAN' ? c.address : '';
},'');

//const hostname = "192.168.0.8";
const port = 8000;

// Create HTTP server
const server = http.createServer((req, res) => {

   // Set the response HTTP header with HTTP status and Content type
   res.writeHead(200, {'Content-Type': 'text/plain'});

   // Send the response body "Hello World"
   res.end('Hello World\n');
});

// Prints a log once the server starts listening
server.listen(port, hostname, () => {
   console.log(`Server running at http://${hostname}:${port}/`);
})
