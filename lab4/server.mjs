"use strict";

import {createServer} from "http";
import {extname, join, resolve} from "path";
import {readFile, existsSync} from "fs";
import {parse as parseUrl} from "url";
import {parse as parseQuery} from "querystring";

// request processing
function webserver(request, response) {
    if (request.url === "/end") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    } else if (request.url.startsWith("/www/")) {
        const path = resolve(join(".", request.url.slice("/www/".length)));
        if (path.startsWith(resolve(".")) && !request.url.includes("/../")) {
          if (existsSync(path)) {
            readFile(path, (err, data) => {
              if (err) {
                response.writeHead(404, { "Content-Type": "text/html" });
                response.end("404 file does't exist");
              } else {
                const commonTypes = {
                  html: "text/html",
                  css: "text/css",
                  js: "application/javascript",
                  png: "image/png",
                  jpg: "image/jpeg",
                  txt: "text/plain",
                };
                const extension = extname(path).slice(1);
                const cntType = commonTypes[extension] || "text/plain";
                response.writeHead(200, { "Content-Type": cntType });
                response.end(data);
              }
            });
          } else {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end("404 file does't exist");
          }
        } else {
          response.writeHead(403, { "Content-Type": "text/html" });
          response.end("Forbidden");
        }
    }
    else if (request.url.slice(0,7)=="bonjour"){
        var name = request.url.slice(17);
        response.writeHeader(200, { 'Content-Type':"text/html"});
        response.write("bonjour " + querystring.unescape(name));
        response.end();}
    else{
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>Server works!</body></html>");
    }
}

// server object creation
const server = createServer(webserver);

const port = process.argv[2] || 8000;

// server starting
server.listen(port, (err) => {});
