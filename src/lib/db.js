const sqlite3  = require('sqlite3');

module.exports.open = async function() {
    return new Promise((resolve, reject) => {
        const dbPath = (process.env.DB_DIR || 'data') + '/' +
            (process.env.DB_FILE || 'db.sqlite')
        let db = new sqlite3.cached.Database(dbPath, err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(db);
            }
        });
    });
};
