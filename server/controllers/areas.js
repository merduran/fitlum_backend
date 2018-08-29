const Area = require('../models').Area;
const { Op } = require('sequelize');
var moment = require('moment');

module.exports = {
  create(req, res) {
    return Area
      .create({
        time: req.body.time,
        facilityId: req.params.facilityId,
      })
      .then(Area => res.status(201).send(Area))
      .catch(error => res.status(400).send(error));
  },
  update(req, res) {
  return Area
    .find({
        where: {
          id: req.params.areaId,
          facilityId: req.params.facilityId,
        },
      })
    .then(area => {
      if (!area) {
        return res.status(404).send({
          message: 'Area Not Found',
        });
      }

      return area
        // .update(req.body, {fields: Objects.keys(req.body)}
       .update({
          time: req.body.time || area.time,
          timeDifference: req.body.timeDifference || area.timeDifference,
        }
        )
        .then(updatedArea => res.status(200).send(updatedArea))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
retrieve(req,res) {
  Area
  .findAndCountAll({
    where: {
      facilityId: req.params.facilityId,
      createdAt: {
        [Op.gte]: moment().subtract(1.5, 'hours').toDate()
      }
    },
    limit: 0
  })
  .then(area => {
      if (!area) {
        return res.status(404).send({
          message: 'Area Not Found',
        });
      }
      console.log(area.count);
      return res.status(200).send(area);
    })
    .catch(error => res.status(400).send(error));
},

destroy(req, res) {
  return Area
    .find({
        where: {
          id: req.params.areaId,
          facilityId: req.params.facilityId,
        },
      })
    .then(Area => {
      if (!Area) {
        return res.status(404).send({
          message: 'Area Not Found',
        });
      }

      return Area
        .destroy()
        .then(() => res.status(204).send())
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
},
};