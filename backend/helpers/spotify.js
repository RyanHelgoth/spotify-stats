import spotifyAPI from "spotify-web-api-node";
import dotenv from "dotenv";

dotenv.config();

/* Spotify API wrapper resources: 
    - https://www.npmjs.com/package/spotify-web-api-node
    - http://thelinmichael.github.io/spotify-web-api-node/ 
*/

const spotify = new spotifyAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
});

// Authenticate using client credential flow
async function authenticate() {
    try {
        const data = await spotify.clientCredentialsGrant();
        console.log(data.body);
        spotify.setAccessToken(data.body.access_token);
        console.log('The access token expires in ' + data.body.expires_in);
        console.log('The access token is ' + data.body.access_token);
    }
    catch (error) {
        console.log(error);
    }
};

async function getTracks(trackName) {
    const options = {};
    const data = await spotify.searchTracks(trackName);
    return {tracks: data.body.tracks.items};
};

async function getTrackStats(ID) {
    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features
    const data = await spotify.getAudioFeaturesForTrack(ID);
    return {stats: data.body};
};

export { authenticate, getTracks, getTrackStats }; 