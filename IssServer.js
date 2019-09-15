/*
 * Server code for ISS Server
 */

var express = require( 'express' );
var app = express();
var router = express.Router();

// HTTP Get request. Send HTML for the page.
router.get( '/', (req, res ) => {
    res.sendFile( __dirname + '/index.html' );
});


// Handle requests for file assets
app.use( '/', router );
app.use(express.static('.'));


// Start server
app.listen( 8080, () => {
    console.log( 'Server running on port 8080' );
});

