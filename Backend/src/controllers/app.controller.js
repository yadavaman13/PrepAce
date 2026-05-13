const path = require('path');

async function redirectUserToClient(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}

module.exports = { redirectUserToClient };