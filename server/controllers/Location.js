const axios = require('axios').default;
const mongoose = require('mongoose');
const where = require('where');

const models = require('../models');
const { Location } = models;


const getAllLocations = (req, res) => Location.LocationModel.getAllLocations((err, docs) => {
    if (err || !docs) {
        console.log(err)
      return res.status(404).json({ error: 'No Locations Found' });
    }

    return res.json({data: docs});
});

const addLocation = (req, res) => {
    let data  = req.body;
    console.log('add loc')
    console.log(req.body);

    if (JSON.parse(Object.keys(req.body)[0])) {
        data = JSON.parse(Object.keys(req.body)[0]);
    }

    if (!data.lng || !data.lat) {
        return res.status(400).json({error: 'Missing paramaters'})
    }
    const locationData = {
        lat: parseFloat(data.lat),
        lng: parseFloat(data.lng),
        city: data.city,
        country: data.country
    }
    const newLocation = new Location.LocationModel(locationData);
    return newLocation.save()
        .then(() => {res.json({success:'Location Successfully Created', location: newLocation})})
        .catch((err) => {res.status(400).json({error: err.message})})
}

const populateLocations = async (req, res) => {
    const messages = await axios.get('https://the-shore.herokuapp.com/api/getMessages');
    //console.log(messages.data)
    const geocoder = new where.Geocoder;

    messages.data.data.forEach( async (e) => {
        // const pt = new where.Point(parseFloat(coordArray[0]),parseFloat(coordArray[1]));
        // geocoder.fromPoint(pt).then((loc) => {
        //     console.log(loc.address);
        // })
        const locData = {
            lat: (Math.random() * 185) - 100,
            lng: (Math.random() * 200) - 100,
            muserId: mongoose.Types.ObjectId(e._id)
        }
        const newLocation = new Location.LocationModel(locData);
        console.log(newLocation)
        newLocation.save()
        .then(() => {console.log(`Location Successfully Created`)})
        .catch((err) => {
            //res.status(400).json({error: err.message})
            console.log(err)
        })
    });

   // return res.json({test: 'hi'})
   return res.redirect('/api/getLocations')
};

const getLocation = (req, res) => {
  if (!req.query.id) {
    return res.status(400).json({ error: 'id is required' });
  }
  return Location.LocationModel.getLocation(req.query.id, (err,doc) => {
    if (err || !doc) {
      return res.status(404).json({ error: `Could Not Find Location with id ${req.query.id}` });
    }
    return res.json({ data: doc });
  });
};

module.exports = {
    getAllLocations,
    addLocation,
    populateLocations,
    getLocation
}
