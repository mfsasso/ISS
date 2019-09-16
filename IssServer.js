/*
 * Server code for ISS Server
 */

const express = require( 'express' );
const app = express();
const router = express.Router();

const http = require( 'http' ).Server(app);
const io = require( 'socket.io' )(http);


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


// Talk over socket
setInterval( function() {
    let rand = Math.random() * 1000;
    io.emit( 'tracking data', rand.toString() );
}, 3000);


// Start server
http.listen( 8080, () => {
    console.log( 'Server running on port 8080' );
});

