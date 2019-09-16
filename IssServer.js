/*
 * Server code for ISS Server
 */

var express = require( 'express' );
var app = express();
var router = express.Router();

var http = require( 'http' ).Server(app);
var io = require( 'socket.io' )(http);

// HTTP Get request. Send HTML for the page.
router.get( '/', (req, res ) => {
    res.sendFile( __dirname + '/index.html' );
});


// Handle requests for file assets
app.use( '/', router );
app.use(express.static('.'));

// Socket.io connection
io.on( 'connection', socket => {
    console.log( 'New WebSocket connection established' )
});


// Start server
http.listen( 8080, () => {
    console.log( 'Server running on port 8080' );
});

