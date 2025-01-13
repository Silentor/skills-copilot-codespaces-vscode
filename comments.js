// create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const comments = require('./comments');

const server = http.createServer((req, res) => {
    if (req.url === '/api/comments' && req.method === 'GET') {
        comments.getComments((err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            }
        });
    } else if (req.url === '/api/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            comments.addComment(JSON.parse(body), (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end('OK');
                }
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(8000, () => {
    console.log('Server is listening on port 8000');
});