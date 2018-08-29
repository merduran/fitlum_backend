const Gym = require('../models').Gyms;
const Class = require('../models').Classes;
const User = require('../models').Users;
const Instructor = require('../models').Instructors;

module.exports = {
  create(req, res) {
    return Gym
      .create({
        title: req.body.title,
      })
      .then(gyms => res.status(201).send(gym))
      .catch(err => {
    console.error("Post request error", err);
  });
  },
  list(req, res) {
  return Gym
    .findAll({
      include: [{
        model: Classes,
        as: 'classes'
      }, {
        model: Users,
        as: 'users',
      },{
        model: Instructors,
        as: 'instructors',
      },{
        model: Facilities,
        as: 'facilities',
      }]
    })
    .then(gyms => res.status(200).send(gym))
    .catch(error => res.status(400).send(error));
},
retrieve(req, res) {
  return Gym
    .findById(req.params.gymId, {
      include: [{
        model: Classes,
        as: 'classes'
      }, {
        model: Users,
        as: 'users',
      },{
        model: Instructors,
        as: 'instructors',
      },{
        model: Facilities,
        as: 'facilities',
      }]
    })
    .then(gym => {
      if (!gym) {
        return res.status(404).send({
          message: 'Gym Not Found',
        });
      }
      return res.status(200).send(gym);
    })
    .catch(error => res.status(400).send(error));
},
update(req, res) {
  return Gym
    .findById(req.params.gymId, {
      include: [{
        model: Classes,
        as: 'classes'
      }, {
        model: Users,
        as: 'users',
      },{
        model: Instructors,
        as: 'instructors',
      },{
        model: Facilities,
        as: 'facilities',
      }],
    })
    .then(gym => {
      if (!gym) {
        return res.status(404).send({
          message: 'Gym Not Found',
        });
      }
      return gym
        .update({
          title: req.body.title || gym.title,
        })
        .then(() => res.status(200).send(gym))  // Send back the updated location.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
destroy(req, res) {
  return Gym
    .findById(req.params.gymId)
    .then(gym => {
      if (!gym) {
        return res.status(400).send({
          message: 'Gym Not Found',
        });
      }
      return gym
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};
