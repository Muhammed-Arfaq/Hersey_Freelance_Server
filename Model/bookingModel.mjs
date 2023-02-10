import mongoose from 'mongoose'
const Objectid = mongoose.Types.ObjectId

const bookingSchema = new mongoose.Schema({
    userId: {
        type: Objectid,
        ref: 'User'
    },
    Description: {
        type: String
    },
    gig: [{
        gigId: {
            type: Objectid,
            ref: 'Gig'
        },
        status: {
            type: String,
            default: 'Reserved'
        }, 
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const Book = mongoose.model('Book', bookingSchema)

export default Book