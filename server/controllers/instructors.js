const Instructor = require('../models').Instructor;
const Gym = require('../models').Gym;
const { Op } = require('sequelize');
var moment = require('moment');

module.exports = {
  create(req, res) {
    return Instructor
      .create({
        time: req.body.time,
        gymId: req.params.gymId,
      })
      .then(Instructor => res.status(201).send(Instructor))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return Instructor
    .findAll({
      include: [{
        model: Classes,
        as: 'classes'
      }]
    })
    .then(gyms => res.status(200).send(gym))
    .catch(error => res.status(400).send(error));
},
  update(req, res) {
  return Instructor
    .find({
        where: {
          id: req.params.instructorId,
          gymId: req.params.gymId,
        },
      })
    .then(instructor => {
      if (!instructor) {
        return res.status(404).send({
          message: 'Instructor Not Found',
        });
      }

      return instructor
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          time: req.body.time || instructor.time,
          timeDifference: req.body.timeDifference || instructor.timeDifference,
        }
        )
        .then(updatedInstructor => res.status(200).send(updatedInstructor))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  Instructor
  .findAndCountAll({
    where: {
      gymId: req.params.gymId,
      // createdAt: {
      //   [Op.gte]: moment().subtract(1.5, 'hours').toDate()
      // }
    },
    // limit: 0
  })
  .then(instructor => {
      if (!instructor) {
        return res.status(404).send({
          message: 'Instructor Not Found',
        });
      }
      console.log(instructor.count);
      return res.status(200).send(instructor);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return Instructor
    .find({
        where: {
          id: req.params.instructorId,
          gymId: req.params.gymId,
        },
      })
    .then(Instructor => {
      if (!Instructor) {
        return res.status(404).send({
          message: 'Instructor Not Found',
        });
      }

      return Instructor
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};