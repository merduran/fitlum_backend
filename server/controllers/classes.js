const Class = require('../models').Classes;
const User = require('../models').Users;
const Instructor = require('../models').Instructors;

module.exports = {
  create(req, res) {
    return Class
      .create({
        title: req.body.title,
      })
      .then(classes => res.status(201).send(class))
      .catch(err => {
    console.error("Post request error", err);
  });
  },
  list(req, res) {
  return Class
    .findAll({
      include: [{
        model: Users,
        as: 'users',
      }]
    })
    .then(classes => res.status(200).send(class))
    .catch(error => res.status(400).send(error));
},
retrieve(req, res) {
  return Class
    .findById(req.params.classId, {
      include: [{
        model: Users,
        as: 'users',
      }]
    })
    .then(class => {
      if (!class) {
        return res.status(404).send({
          message: 'Class Not Found',
        });
      }
      return res.status(200).send(class);
    })
    .catch(error => res.status(400).send(error));
},
update(req, res) {
  return Class
    .findById(req.params.classId, {
      include: [{
        model: Users,
        as: 'users',
      }]	
    })
    .then(class => {
      if (!class) {
        return res.status(404).send({
          message: 'Class Not Found',
        });
      }
      return class
        .update({
          title: req.body.title || class.title,
        })
        .then(() => res.status(200).send(class))  // Send back the updated location.
        .catch((error) => res.status(400).send(error));
    })
    .catch((error) => res.status(400).send(error));
},
destroy(req, res) {
  return Class
    .findById(req.params.classId)
    .then(class => {
      if (!class) {
        return res.status(400).send({
          message: 'Class Not Found',
        });
      }
      return class
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};
