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
    populateMessages
}