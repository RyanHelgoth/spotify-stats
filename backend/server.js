import express from "express";
import dotenv from "dotenv";
import { getTracks, getTrackStats, getTrack } from "./helpers/spotify.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
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



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});