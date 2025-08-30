#!/usr/bin/env node

import http from 'http';
import app from '../app.js';

// catch 404 and render a not-found.hbs template
app.use((req, res, next) => {
  res.status(404);
  res.render('not-found', { actual_page: 'error' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500);
    res.render('error', { actual_page: 'error' });
  }
});

const port = process.env.PORT || 3000;

let server = http.createServer(app);

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.listen(port, () => {
  console.log(`🚀 wannabelieve server listening on port ${port}`);
  console.log(`🌐 Open http://localhost:${port} in your browser`);
});
