const mongoose = require('mongoose')
require('mongoose-double')(mongoose)
mongoose.Promise = global.Promise;

let LocationModel = {};
const SchemaTypes = mongoose.Schema.Types;

const LocationSchema = new mongoose.Schema({
    lng: {
        type:  SchemaTypes.Double
    },
    lat : {
        type: SchemaTypes.Double
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

//getting all the messages
LocationSchema.statics.getAllLocations = (cb) => 
LocationModel.find({}).populate('userId').lean().exec(cb)

LocationSchema.statics.getLocation = (id, cb) => {
    //the fields we are looking for
    const fields = {_id: id};
    LocationModel.find(fields).populate('userId').lean().exec(cb)
};

LocationModel = mongoose.model('Location', LocationSchema);

module.exports = {
    LocationModel,
    LocationSchema
}