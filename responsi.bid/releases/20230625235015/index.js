let express    = require('express')
let env        = require('./env')
let mysql      = require('mysql');
let bodyParser = require('body-parser')
let Hashids    = require('hashids');
let hashids    = new Hashids('Responsi.Bid', 5);
let publicPath = '/code/website';
let app        = express()

app.use( bodyParser.json() );        // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var connection;
function getConnection() {
  if(connection) {
    return connection;
  }
  connection= mysql.createConnection({
    host     : env.db.host,
    user     : env.db.user,
    password : env.db.password,
    database : env.db.database
  });
  connection.connect();
  return connection;
}


app.get('/', (req, res) => {
  return res.status(200).sendFile('404.html', {root: publicPath});
})

app.get('/_a_liv_e', (req, res) => {
  return res.status(200).sendFile('404.html', {root: publicPath});
})

app.get('/:id', (req, res) => {
  let id = hashids.decode( req.params.id )[0] //result of decode is always an array so grab first element
  var db = getConnection();
  db.query('SELECT * FROM urls WHERE id = ?;', [id], function (err, rows, fields) {
    if(err) {
      return res.status(404).sendFile('404.html', {root: publicPath})
    }
    if( rows.length === 0 ) return res.status(404).sendFile('404.html', {root: publicPath});

    return res.redirect(301, rows[0].url);
  })
})

app.listen(env.port, () => {
  console.log(`Responsi.Bid listening on port ${env.port} ${publicPath}`)
})
