let express    = require('express')
let env        = require('./env')
let mysql      = require('mysql');
let bodyParser = require('body-parser')
let Hashids    = require('hashids');
let hashids    = new Hashids('Responsi.Bid', 5);
let publicPath = process.env.PWD
let app        = express()

app.use( bodyParser.json() );        // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var db = mysql.createConnection({
  host     : env.db.host,
  user     : env.db.user,
  password : env.db.password,
  database : env.db.database
});
db.connect();

app.get('/', (req, res) => {
  return res.status(404).sendFile('404.html', {root: publicPath});
})

app.get('/:id', (req, res) => {
  let id = hashids.decode( req.params.id )[0] //result of decode is always an array so grab first element
  db.query('SELECT * FROM urls WHERE id = ?;', [id], function (err, rows, fields) {
    if( rows.length === 0 ) return res.status(404).sendFile('404.html', {root: publicPath});
    
    return res.redirect(301, rows[0].url);
  })
})

app.listen(env.port, () => {
  console.log(`Responsi.Bid listening on port ${env.port}`)
})
