const assert = require('assert');
const axios = require('axios');
require('dotenv').config();

describe('Server', function() {
    const port = process.env.HTTPS ? 443 : 80;
    const scheme = process.env.HTTPS ? 'https' : 'http';
    const url = `${scheme}://localhost:${port}/`;

    it('should respond to defined port', async function() {
        await axios(url, {
            rejectUnauthorized: false
        }).then(res => {
            assert.equal(res.status, 200);
        });
    });
});
