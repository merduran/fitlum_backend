const Facility = require('../models').Facility;
const Gym = require('../models').Gym;
const { Op } = require('sequelize');
var moment = require('moment');

module.exports = {
  create(req, res) {
    return Facility
      .create({
        time: req.body.time,
        gymId: req.params.gymId,
      })
      .then(Facility => res.status(201).send(Facility))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return Facility
    .findAll({
      include: [{
        model: Areas,
        as: 'areas',
      }]
    })
    .then(gyms => res.status(200).send(gym))
    .catch(error => res.status(400).send(error));
},
  update(req, res) {
  return Facility
    .find({
        where: {
          id: req.params.facilityId,
          gymId: req.params.gymId,
        },
      })
    .then(facility => {
      if (!facility) {
        return res.status(404).send({
          message: 'Facility Not Found',
        });
      }

      return facility
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          time: req.body.time || facility.time,
          timeDifference: req.body.timeDifference || facility.timeDifference,
        }
        )
        .then(updatedFacility => res.status(200).send(updatedFacility))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  Facility
  .findAndCountAll({
    where: {
      gymId: req.params.gymId,
      // createdAt: {
      //   [Op.gte]: moment().subtract(1.5, 'hours').toDate()
      // }
    },
    // limit: 0
  })
  .then(facility => {
      if (!facility) {
        return res.status(404).send({
          message: 'Facility Not Found',
        });
      }
      console.log(facility.count);
      return res.status(200).send(facility);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return Facility
    .find({
        where: {
          id: req.params.facilityId,
          gymId: req.params.gymId,
        },
      })
    .then(Facility => {
      if (!Facility) {
        return res.status(404).send({
          message: 'Facility Not Found',
        });
      }

      return Facility
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};