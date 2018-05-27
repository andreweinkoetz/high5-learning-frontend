//Configuration variables
const port      = process.env.PORT        || '3000';
const backendUrl   = 'http://localhost:3001';
const baseUrlFrontend = 'http://localhost:'+port;

module.exports = {
    port,
    backendUrl,
    baseUrlFrontend
};