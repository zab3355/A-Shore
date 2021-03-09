const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

let MessagesModel = {};

const MessagesSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users'
        },
        createdDate: {
            type: Date,
            default: Date.now,
        },
    }]
    
});
//getting all the messages
MessagesSchema.statics.getAllMessages = (cb) => 
MessagesModel.find({}).populate("postedBy").populate("comments.postedBy").lean().exec(cb)

MessagesSchema.statics.getMessage = (id, cb) => {
    //the fields we are looking for
    const fields = {_id: id};
    MessagesModel.find(fields).lean().exec(cb)
};

MessagesModel = mongoose.model('Messages', MessagesSchema);

module.exports = {
    MessagesModel,
    MessagesSchema
}