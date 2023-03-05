import express from "express";
import dotenv from "dotenv";
import { getTracks, getTrackStats, getTrack } from "./helpers/spotify.js";
import { getSongs, upsertSong, clearDB } from "./helpers/db.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || "4000";


app.get("/api/tracks", async (req, res) => {
    const trackName = req.query["track-name"];
    const tracks = await getTracks(trackName);
    res.send(tracks);
});

app.get("/api/track/:trackID", async (req, res) => {
    const trackID = req.params.trackID;
    const track = await getTrack(trackID);
    res.send(track);
});

app.get("/api/track-stats/:trackID", async (req, res) => {
    const trackID = req.params.trackID;
    const stats = await getTrackStats(trackID);
    res.send(stats);
});

app.get("/api/top-viewed-songs", async (req, res) => {
    const songs = await getSongs();
    res.send(songs);
});

app.post("/api/searched-song", async (req, res) => {
    console.log(req.body)
    const song = req.body;
    const status = await upsertSong(song);
    let message;

    if (status === 200) {
        message = "Song created";
    }
    else if (status === 201) {
        message = "Song updated";
    }
    else {
        message = "Error";
    }

    res.status(status);
    res.send(message);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});