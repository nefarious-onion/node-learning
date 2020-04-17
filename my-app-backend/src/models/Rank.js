const mongoose = require('mongoose');

const RankSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    score: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Ranks', RankSchema);