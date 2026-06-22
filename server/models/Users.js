const crypto = require('crypto');
const mongoose = require('mongoose');
require('mongoose-type-email');

mongoose.Promise = global.Promise;

let UserModel = {};
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-.]{1,16}$/,
  },
  loginCode: {
    type: String,
    required: true,
  },
  locId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location'
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.statics.toAPI = (doc) => ({
  // _id is built into your mongo document and is guaranteed to be unique
  username: doc.username,
  _id: doc._id,
});

UserSchema.statics.getAllUsers = (cb) => 
UserModel.find({}).populate('locId').lean().exec(cb)

UserSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return UserModel.findOne(search, callback);
};

UserSchema.statics.checkLogin = (name, code, callback) => {
    const search = {
      username: name,
      loginCode: code
    };
  
    return UserModel.findOne(search, callback);
  };


UserSchema.statics.updateUser = (id, userObj, callback) => {
  console.log(id, userObj);
  UserModel.findOneAndUpdate(id, userObj, {
    new: true,
  }, callback);
};

UserSchema.statics.getUsers = (id, callback) => UserModel.find({}).where('_id').ne(id).select('username email firstName lastName')
  .lean()
  .exec(callback);


  UserModel = mongoose.model('Users', UserSchema);

module.exports.UserModel = UserModel;
module.exports.UserSchema = UserSchema;