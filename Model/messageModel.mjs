import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({
    chatUsers: {
        type: Array,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)

export default Message