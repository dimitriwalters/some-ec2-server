// Import builtin NodeJS modules to instantiate the service
const https = require("https");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Import the express module
const express = require("express");

// Instantiate an Express application
const app = express();

// Create a NodeJS HTTPS listener that points to the Express app
// Use a callback function to tell when the server is created.
https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("./ssl/private.key"),
      cert: fs.readFileSync("./ssl/certificate.crt"),
      ca: fs.readFileSync("./ssl/ca_bundle.crt")
    },
    app
  )
  .listen(443, () => {
    console.log("serever is runing at port 443");
  });

http
  .createServer(app)
  .listen(80);

app.use((req, res, next) => {
  if (req.protocol === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }

  next();
});

// Create an try point route for the Express app
// This code tells the service to listed to any request coming to the / route.
// Once the request is received, it will display a message "Hello from express server."
app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, "../client/public", "index.html"));
});

