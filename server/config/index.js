import bunyan from 'bunyan';
//Load package.json 
import pjs from '../../package.json';

// Get some meta info from the package.json
const { name, version } = pjs;

//set up a logger
const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({name: `${serviceName}:${serviceVersion}`, level});

//Configuration options for different environments
export default {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'debug')
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'info')
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, 'fatal')
  }
}