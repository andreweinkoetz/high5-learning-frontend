//Configuration variables
const port      = process.env.PORT        || '3000';
const backendUrl   = process.env.BACKENDURL || 'http://localhost:3001';
const baseUrlFrontend = process.env.OWNURL || 'http://localhost:'+port;

module.exports = {
    port,
    backendUrl,
    baseUrlFrontend
};
