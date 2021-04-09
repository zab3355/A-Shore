const axios = require('axios').default;
const mongoose = require('mongoose');

const models = require('../models');
const { Messages } = models;


const getAllMessages = (req, res) => Messages.MessagesModel.getAllMessages((err, docs) => {
    if (err || !docs) {
        console.log(err)
      return res.status(404).json({ error: 'No Messages Found' });
    }

    return res.json({data: docs});
});

const getMessage = (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ error: 'id is required' });
  }
  return Messages.MessagesModel.getMessage(req.query.id, (err,doc) => {
    if (err || !doc) {
      return res.status(404).json({ error: `Could Not Find Message with id ${req.query.id}` });
    }
    return res.json({ data: doc });
  });
};

const addComment = (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'id is required' });
  };
  if (!req.body.commentText) {
    return res.status(400).json({ error: 'Comment Text is required' });
  }
  const comment = {text: req.body.commentText, postedBy: req.body.commentId }
  return Messages.MessagesModel.findOneAndUpdate(
    {_id: req.body.id},
    { $push: {comments: comment} },
    (err, success) => {
      if (err) {
        return res.status(400).json({error: 'Could Not Add Comement'})
      }
      return res.json({data: success})
    }
  )
};

const addViewedBy = (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({ error: 'id is required' });
  };
  if (!req.body.viewerId) {
    return res.status(400).json({ error: 'Viewer id is required' });
  }
  const view = {user: req.body.viewerId }
  return Messages.MessagesModel.findOneAndUpdate(
    {_id: req.body.id},
    { $push: {viewedBy: view} },
    (err, success) => {
      if (err) {
        return res.status(400).json({error: 'Could Not Add Viewer'})
      }
      return res.json({data: success})
    }
  )
};

const addLikeToComment = (req, res) => {
  console.log("here")
  if (!req.body.id) {
    return res.status(400).json({ error: 'Messageid is required' });
  };
  if (!req.body.commentId) {
    return res.status(400).json({ error: 'Comment id is required' });
  }
 // const view = {user: req.body.viewerId }
  return Messages.MessagesModel.findOneAndUpdate(
    {
      '_id': req.body.id,
      'comments._id':req.body.commentId
    },
    {$inc: {'comments.$.numberOfLikes': 1} },
    (err, success) => {
      console.log(success)
      console.log(err)
      if (err) {
        return res.status(400).json("Could Not Add Like")
      }
      return res.json({success: success})
    }
  )
};

const addMessage = (req, res) => {
    const { data } = req.body;

    if (!data.content) {
        return res.status(400).json({error: 'No content provided'})
    }
    const messageData = {
        content: data.content,
        userId: data.userId || null
    }
    const newMessage = new Messages.MessagesModel(messageData);
    return newMessage.save()
        .then(() => {res.json({success:'Message Successfully Created'})})
        .catch((err) => {res.status(400).json({error: err.message})})

}

const populateMessages = async (req,res) => {
    console.log('here')

    const results = await axios.get("https://zenquotes.io/api/quotes");

    console.log(results.data.length);
    for (let i = 0; i < results.data.length; i++) {
        let r = results.data[i];
        const messageData = {
            content: r["q"],
            postedBy: mongoose.Types.ObjectId("6041b7d04586a8385c633438"),
            comments: [{
                text: 'What an inspirational quote',
                postedBy: mongoose.Types.ObjectId("6041b94b45661952d04f5794")
            }]
        }
        const newMessage = new Messages.MessagesModel(messageData);

        newMessage.save()
            .then(() => {console.log(`Message Successfully Created`)})
            .catch((err) => {
                //res.status(400).json({error: err.message})
                console.log(err)
            })
    }

    return getAllMessages(req, res);
}


module.exports = {
    getAllMessages,
    addMessage,
    populateMessages,
    getMessage,
    addComment,
    addViewedBy,
    addLikeToComment
}
