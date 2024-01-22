const Pool = require('pg').Pool;

const connectionString =process.env.DB_CONNECTION_STRING;

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false, 
    },
    // user: "todolist_gxih_user",
    // password:"j6FmrT5pCtZuhjpHM4BlW3Q5k07tS4yI",
    // host:'dpg-cmmm14gl5elc73cd48c0-a',
    // database:'todolist_gxih',
    // port:5432
})


module.exports = pool