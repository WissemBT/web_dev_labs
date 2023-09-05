"use strict";

import {createServer} from "http";
import {extname, join, resolve} from "path";
import {readFile, existsSync} from "fs";
import {parse as parseUrl} from "url";
import {parse as parseQuery} from "querystring";

const db = "storage.json";


function webserver(request, response) {
  const parsedUrl = parseUrl(request.url, true);
  const query = parsedUrl.query;
  const urlPath = parsedUrl.pathname;
    if (request.url === "/stop") {
        response.setHeader("Content-Type", "text/html; charset=utf-8");
        response.end("<!doctype html><html><body>The server will stop now.</body></html>");
        process.exit(0);
    } else if (request.url.startsWith("/WWW/")) {
        const path = resolve(join(".", request.url.slice("/WWW/".length)));
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
        } 
        else if (request.url === '/Slices') {
          if (!fs.existsSync(db)) {
            response.writeHead(404, { "Content-Type": "text/plain" });
            response.end("404 file doesn't exist");
          } else {
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(fs.readFileSync(db));
            response.end();
          }
        }
        else if (request.url.startsWith("/add")) {
          const { title, value, color } = query;
          const newData = { title, color, value: Number(value) };
          let data = JSON.parse(readFileSync(db));
          data.push(newData);
          writeFileSync(db, JSON.stringify(data));
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end("Element added");
        } else if (request.url.startsWith("/remove")) {
          const index = Number(query.index);
          let data = JSON.parse(readFileSync(db));
          if (index >= 0 && index < data.length) {
            data.splice(index, 1);
            writeFileSync(db, JSON.stringify(data));
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Element removed");
          } else {
            response.writeHead(400, { "Content-Type": "text/plain" });
            response.end("Invalid index");
          }
        } else if (request.url.startsWith("/clear")) {
          writeFileSync(db, JSON.stringify([{ title: "empty", color: "red", value: 1 }]));
          response.writeHead(200, { "Content-Type": "text/plain" });
          response.end("JSON cleared");}
        else {
          response.writeHead(403, { "Content-Type": "text/html" });
          response.end("Forbidden");
        }
    }
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
