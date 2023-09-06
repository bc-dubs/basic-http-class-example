const http = require('http'); // Importing http (core library from node) as a class
const fs = require('fs'); // Stands for 'file system'. Gives access to file system on server's physical machine

const port = process.env.PORT || process.env.NODE_PORT || 3000; // Try to obtain correct port from Heroku ("apartment #" of computer). If can't get one, use standard dev port as fallback
const index = fs.readFileSync(`${__dirname}/../client/client.html`); // Synchronously read file into memory (program does not continue until this line ends)
// __dirname gives absolute path to current file/directory
// index stores entire content of file - this is fine for text files but other methods will have to be used for bigger files

// The library will set up the server, we just need to tell them what to do when requests come in
// response object is mostly empty but we populate it
const onRequest = (request, response) => {
    console.log(request.url);
    response.writeHead(200, { 'Content-Type': 'text/html' }); // Writes metadata abt response (analagous to HTML head/body distinction)
    // Status code (200 is 'successful'), object w/ http headers (MIME media encoding type to tell server how to interperet binary, similar to a data type)
    // We can display it in alternate formats by changing type (databending)
    // Cannot write headers after they are sent to client (for security reasons)
    response.write(index); // Writes the 'body' of the response
    response.end();
};


 // Returns server object
 // .listen takes port # and a callback func that runs when the server starts
http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on 127.0.0.1:${port}`);
});