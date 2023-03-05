import spotifyAPI from "spotify-web-api-node";
import dotenv from "dotenv";
import schedule from "node-schedule";
import { backOff } from "exponential-backoff";


dotenv.config();

/* Spotify API wrapper resources: 
    - https://www.npmjs.com/package/spotify-web-api-node
    - http://thelinmichael.github.io/spotify-web-api-node/ 
*/

const spotify = new spotifyAPI({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});

async function getToken() {
    const data = await spotify.clientCredentialsGrant();
    console.log(data.body);
    spotify.setAccessToken(data.body.access_token);
    console.log('The access token expires in ' + data.body.expires_in);
    console.log('The access token is ' + data.body.access_token);
}

// Authenticate using client credential flow
async function authenticate() {
    try {
        // Retrys auth if it fails.
        await backOff(() => getToken());
    }
    catch (error) { 
        console.log(error);
    }    
};

async function getTracks(trackName) {
    const options = {limit: 50};

    try {
        const data = await spotify.searchTracks(trackName, options);
        return {tracks: data.body.tracks.items};
    }
    catch (error) {
        console.log(error);
    }
};

async function getTrackStats(ID) {
    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features

    try {
        const data = await spotify.getAudioFeaturesForTrack(ID);
        return {stats: data.body};
    }
    catch (error) {
        console.log(error);
    }
    
    
};


async function getTrack(ID) {
    // https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features

    try {
        const data = await spotify.getTrack(ID);
    }
    catch (error) {
        console.log(error);
    }
    
    return {track: data.body};
};

// Authenticate when server starts
authenticate();

// Refresh auth every hour
const date = new Date();
const minutes = date.getMinutes();
const cronSchedule = `${minutes} * * * *`; 
const refreshAuth = schedule.scheduleJob(cronSchedule, async () => {
    await authenticate();
    console.log("Refreshed auth");
});

export { getTracks, getTrackStats, getTrack }; 