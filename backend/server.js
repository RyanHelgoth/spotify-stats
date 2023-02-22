import express from "express";
import dotenv from "dotenv";
import { getTracks, getTrackStats } from "./helpers/spotify.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({extended: true}));
const PORT = process.env.PORT || "4000";


app.get("/tracks", async (req, res) => {
    const trackName = req.query["track-name"];
    const tracks = await getTracks(trackName);
    res.send(tracks);
});

app.get("/track-stats/:trackID", async (req, res) => {
    const trackID = req.params.trackID;
    const stats = await getTrackStats(trackID);
    res.send(stats);
});



app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});