const mongoose = require('mongoose');
const { use } = require('../routes/authRoutes');
const DocumentSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
   
    fileUrl: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
});
module.exports = mongoose.model('Document', DocumentSchema);