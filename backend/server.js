import express from "express";
import dotenv from "dotenv";
import { getTracks, getTrackStats, getTrack } from "./helpers/spotify.js";
import { getTopSongs, upsertSong } from "./helpers/db.js";
import * as path from 'path';

/*
    Used: https://github.com/basir/mern-amazona 
    as reference for deploying MERN app.
*/

dotenv.config();
const app = express();
const __dirname = path.resolve(); // https://stackoverflow.com/a/68163774
const PORT = process.env.PORT || "4000";
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend/build")));

// Get list of 50 tracks based on search query
app.get("/api/tracks", async (req, res) => {
    const trackName = req.query["track-name"];
    const data = await getTracks(trackName);
    res.status(data.status).send(data);
});

// Get a single track based on track ID
app.get("/api/track/:trackID", async (req, res) => {
    const trackID = req.params.trackID;
    const data = await getTrack(trackID);
    res.status(data.status).send(data);
});

// Get stats for a single track based on track ID
app.get("/api/track-stats/:trackID", async (req, res) => {
    const trackID = req.params.trackID;
    const data = await getTrackStats(trackID);
    res.status(data.status).send(data);
});

// Get list of top 50 most veiwed songs on Spotify Song Stats
app.get("/api/top-viewed-songs", async (req, res) => {
    const data = await getTopSongs();
    res.status(data.status).send(data);
});

/* 
    Add increment views of song in db. 
    If song doesnt exist in db, add it with 1 view.
*/
app.post("/api/viewed-song", async (req, res) => {
    const song = req.body;
    const data = await upsertSong(song);
    res.status(data.status).send(data);
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});