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
    let data;

    try {
        data = await spotify.clientCredentialsGrant();
    }
    catch (error) {
        console.log(error);
    }

    console.log(data.body);
    spotify.setAccessToken(data.body.access_token);
    console.log('The access token expires in ' + data.body.expires_in);
    console.log('The access token is ' + data.body.access_token);
};

async function getTracks(trackName) {
    const options = {};
    let data;

    try {
        data = await spotify.searchTracks(trackName);
    }
    catch (error) {
        if (error.body.error.status === 401) {
            // If 401 error, authenticate and try again.
            // TODO: instead get new token a minute before the old one expires
            console.log("auth error")
            await authenticate();
            data = await spotify.searchTracks(trackName);
        }
        else {
            console.log(error);
        }
    }

    return {tracks: data.body.tracks.items};
};

async function getTrackStats(ID) {
    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features
    let data;

    try {
        data = await spotify.getAudioFeaturesForTrack(ID);
    }
    catch (error) {
        if (error.body.error.status === 401) {
            // If 401 error, authenticate and try again.
            // TODO: instead get new token a minute before the old one expires
            console.log("auth error")
            await authenticate();
            data = await spotify.getAudioFeaturesForTrack(ID);
        }
        else {
            console.log(error);
        }
    }
    
    return {stats: data.body};
};

export { getTracks, getTrackStats }; 