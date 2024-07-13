const mongoose = require('mongoose')
const sinhVienSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
})

// mongodb://localhost:27017

const sinhVien = mongoose.model('students', sinhVienSchema)
module.exports = sinhVien