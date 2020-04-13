var sql = require('mssql');
//config for your database
var config = {
    user:'Singh',
    password:'1234',
    server: 'localhost',
    database: 'projectworkplace',
    options: {
        database: 'AP'
    },
};

//connect to your database, node module export format
module.exports = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL!');
        return pool;
    })
    .catch(err => console.log('Database Connection Error: ', err));


    