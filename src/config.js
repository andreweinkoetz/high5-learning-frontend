//Configuration variables
const port      = process.env.PORT        || '3000';
const backendUrl   = process.env.backendUrl || 'http://localhost:3001';
const baseUrlFrontend = process.env.ownUrl || 'http://localhost:'+port;

module.exports = {
    port,
    backendUrl,
    baseUrlFrontend
};
