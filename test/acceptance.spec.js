const assert = require('assert');
const axios = require('axios');
require('dotenv').config();

describe('Server', function() {
    const port = process.env.PORT;
    const scheme = port == 80 ? 'http' : 'https';
    const url = `${scheme}://localhost:${port}/`;

    it('should respond to defined port', async function() {
        await axios(url).then(res => {
            assert.equal(res.status, 200);
        });
    });
});
