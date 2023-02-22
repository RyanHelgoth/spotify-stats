import express from "express";
import dotenv from "dotenv";
import { authenticate, getTracks, getTrackStats } from "./helpers/spotify.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || "4000";


app.get("/tracks", async (req, res) => {
    const trackName = req.query["track-name"];
    let tracks;

    try {
        tracks = await getTracks(trackName);
    }
    catch (error) {
        if (error.body.error.status === 401) {
            console.log("auth error")
            await authenticate();
            tracks = await getTracks(trackName);
        }
        else {
            console.log(error);
        }
    } 

    res.send(tracks);
});

app.get("/track-stats/:trackID", async (req, res) => {
    const trackID = req.params.trackID;
    let stats;
    
    try {
        stats = await getTrackStats(trackID);
    }
    catch (error) {
        if (error.body.error.status === 401) {
            console.log("auth error")
            await authenticate();
            stats = await getTrackStats(trackID);
        }
        else {
            console.log(error);
        }
    } 

    res.send(stats);
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});