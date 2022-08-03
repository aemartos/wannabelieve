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

let server = http.createServer(app);

server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

const port = process.env.PORT;
app.listen(port, () => console.log(`Listening on http://localhost:${port}`))
  .on('error', (e) => {
    console.log('Error', e);
    app.listen(Number(port) + 1, () => console.log(`Listening on http://localhost:${Number(port) + 1}`));
  });
