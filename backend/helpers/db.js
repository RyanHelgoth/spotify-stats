import dotenv from "dotenv";
import mongoose from "mongoose";
import schedule from "node-schedule";

// mongod --dbpath '/f/git/spotify-stats/backend/data/db'
//mongodb://127.0.0.1:27017/

dotenv.config();
connect();
const Song = createModel();

// Clear db at the start of each month
const cronSchedule = "0 0 1 * *";
const clearViews = schedule.scheduleJob(cronSchedule, async () => {
    await clearDB();
});

async function connect() {
    const options = {keepAlive: true}
    try {
        await mongoose.connect(process.env.DB_URL + process.env.DB_NAME, options);
        console.log("Connected to db");
    }
    catch (error) {
        console.log(error);
    }
}

function createModel() {
    const songSchema = new mongoose.Schema ({
        id: String,
        songName: String,
        explicit: Boolean,
        popularity: Number,
        link: String,
        playLink: String,
        albumName: String,
        albumType: String,
        coverArt: String,
        releaseDate: String,
        releasePrecision: String,
        artists: [String],
        songNumber: Number,
        albumSongAmount: Number,
        discNumber: Number,
        duration: Number,
        views: Number
    });

    const Song = mongoose.model("Song", songSchema);
    return Song;
}

async function upsertSong(song) {
    let response = {};

    try {
        const songViewedBefore = await Song.exists({id: song.id})

        if (songViewedBefore) {
            // If song viewed before, update view count
            const filter = {id: song.id};
            // https://stackoverflow.com/a/41444359
            const update = {$inc: {views: 1}};
            await Song.findOneAndUpdate(filter, update);
            response.status = 200;
        }
        else {
            // If song has never been viewed before create new db entry
            song.views = 1;
            const newSong = new Song(song);
            await Song.create(newSong);
            response.status = 201;
        }
    }
    catch (error) {
        console.log(error);
        response.error = {
            error: "Server Error",
            error_description: error.message
        }
        response.status = 500;
    }   
    finally {
        return response;
    }
};

async function getTopSongs() {
    let response = {};
    try {
        // Get top 50 most viewed songs
        const top50 = await Song.find().sort({views: "ascending"}).limit(50);
        response.songs = top50;
        response.status = 200;
    }
    catch (err) {
        console.log(err);
        response.error = {
            error: "Server Error",
            error_description: err.message
        }
        response.status = 500;
    }
    finally {
        return response;
    }
}

async function clearDB() {
    // Used to reset most viewed songs list at the start of each month
    try {
        await Song.deleteMany();
        console.log("Cleared db");
    }
    catch (err) {
        console.log(err);
        console.log("Unable to clear db");
    }
};

export { getTopSongs, upsertSong, clearDB };