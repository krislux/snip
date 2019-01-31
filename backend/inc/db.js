const sqlite3  = require('sqlite3');

exports.open = async function() {
    return new Promise((resolve, reject) => {
        let db = new sqlite3.cached.Database(process.env.DB_DIR + '/' + process.env.DB_FILE, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(db);
            }
        });
    });
};
