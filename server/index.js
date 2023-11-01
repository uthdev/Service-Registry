import express from 'express';
import configs from './config';

const config = configs[process.env.NODE_ENV || 'development']
const server = express();
const log = config.log();

// Add a request logging middleware in development mode
if (server.get('env') === 'development') {
  server.use((req, res, next) => {
    log.debug(`${req.method}: ${req.url}`);
    return next();
  });
}

// eslint-disable-next-line no-unused-vars
server.use((error, req, res, next) => {
  res.status(error.status || 500);
  // Log out the error to the console
  log.error(error);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, log.info(
  `Hi there! I'm listening on port ${PORT} in ${server.get('env')} mode.`,
));

export default  server;
