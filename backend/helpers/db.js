import dotenv from "dotenv";
import mongoose from "mongoose";
import schedule from "node-schedule";

// mongod --dbpath '/f/git/spotify-stats/backend/data/db'

dotenv.config();

console.log(process.env.DB_URL + process.env.DB_NAME)
mongoose.connect(process.env.DB_URL + process.env.DB_NAME);

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
    searches: Number
});
const Song = mongoose.model("Song", songSchema);

async function upsertSong(song) {
    let status;
    try {
        const songSearchedBefore = await Song.exists({id: song.id})

        if (songSearchedBefore) {
            // If song searched before, update search count
            const filter = {id: song.id};
            // https://stackoverflow.com/a/41444359
            const update = {$inc: {searches: 1}};
            await Song.findOneAndUpdate(filter, update);
            status = 200
        }
        else {
            // If song has never been searched before create new db entry
            song.searches = 1;
            const newSong = new Song (song);
            await Song.create(newSong);
            status = 201
        }
    }
    catch (err) {
        console.log(err);
    }   

    return status;
};

async function getSongs() {
    //TODO If amount returned < 45, then adjust amount
    // of pagination tabs.
    try {
        // Get top 50 most searched songs
        const top50 = await Song.find().sort({searches: "ascending"}).limit(50);
        return top50;
    }
    catch (err) {
        console.log(err);
    }
}

async function clearDB() {
    // Used to reset most searched songs list at the start of each month
    try {
        await Song.deleteMany();
    }
    catch (err) {
        console.log(err);
    }
};


// Clear db at the start of each month
const cronSchedule = "0 0 1 * *";
//const cronSchedule = "30 * * * * *"; //TEST
const clearSearches = schedule.scheduleJob(cronSchedule, async () => {
    await clearDB();
    console.log("Cleared db");
});


export { getSongs, upsertSong, clearDB };