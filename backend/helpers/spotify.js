import spotifyAPI from "spotify-web-api-node";
import dotenv from "dotenv";
import schedule from "node-schedule";
import { backOff } from "exponential-backoff";

/* 
Spotify API wrapper resources: 
    - https://www.npmjs.com/package/spotify-web-api-node
    - http://thelinmichael.github.io/spotify-web-api-node/ 
*/

dotenv.config();

const spotify = apiSetup();

// Authenticate when server starts
authenticate();

// Refresh auth every hour
const date = new Date();
const minutes = date.getMinutes();
const cronSchedule = `${minutes} * * * *`; 
const refreshAuth = schedule.scheduleJob(cronSchedule, async () => {
    await authenticate();
});

function apiSetup() {
    const spotify = new spotifyAPI({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    });

    return spotify;
}

async function getToken() {
    const data = await spotify.clientCredentialsGrant();
    spotify.setAccessToken(data.body.access_token);
    console.log("Fetched new token");
}

// Authenticate using client credential flow
async function authenticate() {
    try {
        // Retrys auth a few times if it fails initially.
        await backOff(() => getToken());
    }
    catch (error) { 
        console.log(error);
    }    
};

async function getTracks(trackName) {
    let response = {};
    try {
        const options = {limit: 50};
        const data = await spotify.searchTracks(trackName, options);
        response.status = data.statusCode;
        if (data.statusCode >= 200 && data.statusCode < 300) {
            response.tracks = data.body.tracks.items;
        }
        else {
            console.log(data);
            response.error = data.body; // Includes error title and description
        }
    }
    catch (error) {
        console.log(error);
        response.error = {
            error: error.body.error.message,
            error_description: "No description for this error"
        }
        response.status = error.body.error.status;
    }
    finally {
        return response;
    }
};

async function getTrackStats(ID) {
    let response = {};
    try {
        const data = await spotify.getAudioFeaturesForTrack(ID);
        response.status = data.statusCode;
        if (data.statusCode >= 200 && data.statusCode < 300) {
            response.stats = data.body;
        }
        else {
            console.log(data);
            response.error = data.body; // Includes error title and description
        }
    }
    catch (error) {
        console.log(error);
        response.error = {
            error: error.body.error.message,
            error_description: "No description for this error"
        }
        response.status = error.body.error.status;
    }
    finally {
        return response;
    }
};

async function getTrack(ID) {
    let response = {};
    try {
        const data = await spotify.getTrack(ID);
        response.status = data.statusCode;
        if (data.statusCode >= 200 && data.statusCode < 300) {
            response.track = data.body;
        }
        else {
            console.log(data);
            response.error = data.body; // Includes error title and description
        }
    }
    catch (error) {
        console.log(error);
        response.error = {
            error: error.body.error.message,
            error_description: "No description for this error"
        }
        response.status = error.body.error.status;
    }
    finally {
        return response;
    }
};


export { getTracks, getTrackStats, getTrack }; 