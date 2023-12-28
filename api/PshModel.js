const mongoose = require("mongoose");

const phs = mongoose.Schema({
    nama: {
        type: String,
        require: true,
    },

    gender: {
        type: String,
        require: true,
    },

    tglLahir: {
        type: Date,
        require: true,
    },

    noHp: {
        type: Number,
        require: true,
    },

    asuransi: {
        type: String,
        require: true,
        enum: ["ya", "tidak"],
    },

    tempatLahir: {
        type: String,
        require: true,
    },

    noAsuransi: {
        type: Number,
        require: true,
    },

    poli: {
        type: String,
        require: true,
    },

    keluhan: {
        type: String,
        require: true,
    },
  
})

module.exports = mongoose.model("phs", phs);