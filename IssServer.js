/*
 * Server code for ISS Server
 */

const express = require( 'express' );
const app = express();
const router = express.Router();

const http = require( 'http' ).Server(app);
const io = require( 'socket.io' )(http);

const https = require( 'https' );


// Function to obtain sat data for ISS and emit it over the 'tracking data' socket
function getISSData() {

    https.get('https://www.n2yo.com/rest/v1/satellite/positions/25544/42.65843/-71.137/0/5/&apiKey=ZFQPGU-CHGFV7-RFP87T-47AV', (resp) => {

        let data = '';

        resp.on('data', chunk => {
            data += chunk;
        });

        resp.on('end', () => {
            let ISSData = JSON.parse(data);
            let positions = ISSData.positions;
            positions.forEach( val => {
                let result = "Lat: " + val.satlatitude.toString();
                result += "  Long: " + val.satlongitude.toString();
                result += "  Alt: " + val.sataltitude.toString();
                result += "  Az: " + val.azimuth.toString();
                result += "  El: " + val.elevation.toString();
                result += "  RA: " + val.ra.toString();
                result += "  Dec: " + val.dec.toString();
                result += "  Time: " + val.timestamp.toString();
		io.emit( 'tracking data', result );
            });
        });

    }).on("error", err => {
        console.log("Error: " + err.message);
    });

};


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
setInterval( getISSData, 5000 );


// Start server
http.listen( 8080, () => {
    console.log( 'Server running on port 8080' );
});

