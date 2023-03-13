// Data used on about page
const data = {
    descriptions: [
        {
            desc: `A confidence measure from 0% to 100% of whether the track is acoustic. 100% represents high confidence the track is acoustic.`,
            name: "Accousticness"
        },
        {
            desc: `Danceability describes how suitable a track is for dancing based on a combination of musical elements including 
            tempo, rhythm stability, beat strength, and overall regularity. A value of 0% is least danceable and 100% is most danceable.`,
            name: "Danceablity"
        },
        {
            desc: `Energy is a measure from 0% to 100% and represents a perceptual measure of intensity and activity. 
            Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. 
            Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.`,
            name: "Energy"
        },
        {
            desc: `Predicts whether a track contains no vocals. "Ooh" and "aah" sounds are treated as instrumental in this context. 
            Rap or spoken word tracks are clearly "vocal". The closer the instrumentalness value is to 100%, the greater likelihood the track contains no vocal content. 
            Values above 50% are intended to represent instrumental tracks, but confidence is higher as the value approaches 100%.`,
            name: "Instrumentalness"
        },
        {
            desc: `Detects the presence of an audience in the recording. Higher liveness values represent an increased probability that the track was performed live. 
            A value above 80% provides strong likelihood that the track is live.`,
            name: "Liveness"
        },
        {
            desc: `The overall loudness of a track in decibels (dB). Loudness values are averaged across the entire track and are useful for comparing relative loudness of tracks.`,
            name: "Loudness"
        },
        {
            desc: `The popularity of a track is a value between 0% and 100%, with 100% being the most popular. 
            The popularity is calculated by algorithm and is based, 
            in the most part, on the total number of plays the track has had and how recent those plays are.
            Generally speaking, songs that are being played a lot now will have a higher popularity than songs that were played a lot in the past. 
            Duplicate tracks (e.g. the same track from a single and an album) are rated independently. 
            Note: the popularity value may lag actual popularity by a few days: the value is not updated in real time.`,
            name: "Popularity"
        },
        {
            desc: `Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), 
            the closer to 100% the attribute value. Values above 66% describe tracks that are probably made entirely of spoken words. 
            Values between 33% and 66% describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. 
            Values below 33% most likely represent music and other non-speech-like tracks.`,
            name: "Speechiness"
        },
        {
            desc: `Estimated time signature that can only range between 3/4 and 7/4 time.`,
            name: "Time Signature"
        },
        {
            desc: `A measure from 0% to 100% describing the musical positiveness conveyed by a track. 
            Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), 
            while tracks with low valence sound more negative (e.g. sad, depressed, angry).`,
            name: "Valence"
        },
    ],
    links: {
        github: "https://github.com/RyanHelgoth/spotify-stats",
        email: "mailto:rhdev99@gmail.com",
        featuresApi: "https://developer.spotify.com/documentation/web-api/reference/#/operations/get-audio-features",
        trackApi: "https://developer.spotify.com/documentation/web-api/reference/#/operations/get-track"
    }
}

export default data;